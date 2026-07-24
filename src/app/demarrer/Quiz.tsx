"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { questionFlow, computeReco, type Answers } from "@/lib/quiz";
import { createClient } from "@/lib/supabase/client";
import {
  dismissQuizRecommendation,
  saveQuizRecommendation,
  syncJourneyState,
} from "@/lib/journey-state";

type SaveState = "idle" | "saving" | "saved" | "anon" | "error";

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>("idle");

  useEffect(() => {
    if (!done) return;
    (async () => {
      const reco = computeReco(answers);
      saveQuizRecommendation({
        niveau: reco.niveau,
        objectif: reco.cible,
        branche: reco.branche,
        moduleHref: reco.hero.cta?.href ?? null,
        moduleTitle: reco.hero.titre,
        updatedAt: new Date().toISOString(),
      });
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setSaveState("anon");
        return;
      }
      setSaveState("saving");
      const { error } = await supabase
        .from("profiles")
        .update({ niveau: reco.niveau, objectif: reco.cible })
        .eq("id", user.id);
      if (!error) await syncJourneyState(user.id);
      setSaveState(error ? "error" : "saved");
    })();
  }, [done, answers]);

  function choose(qid: string, value: string) {
    const next = { ...answers, [qid]: value };
    setAnswers(next);
    // petit délai pour que la sélection se voie avant de passer à la suite
    setTimeout(() => {
      const nextFlow = questionFlow(next);
      if (step < nextFlow.length - 1) setStep(step + 1);
      else setDone(true);
    }, 180);
  }

  function restart() {
    setAnswers({});
    setStep(0);
    setDone(false);
    setSaveState("idle");
  }

  // La recommandation reste mémorisée, mais elle ne dirige plus la page des
  // parcours si la personne préfère choisir elle-même.
  function chooseMyself() {
    dismissQuizRecommendation();
    window.location.assign("/parcours");
  }

  if (done) {
    const reco = computeReco(answers);
    const targetHref = reco.hero.cta?.href ?? "/parcours";
    const accountHref = `/inscription?next=${encodeURIComponent(targetHref)}`;
    return (
      <div className="quiz-result">
        <div className="reco-tag">Ta recommandation</div>
        <h2>
          Tu serais dans <em>{reco.hero.famille}</em>.
        </h2>
        <p className="quiz-result-sub">
          À ton niveau ({reco.niveau}), tu commencerais par « {reco.hero.titre} ». {reco.hero.note}
        </p>

        <div className="reco-main">
          <div className="reco-tag hot">On commence ici</div>
          <h3>{reco.hero.titre}</h3>
          <p>
            {reco.hero.enPreparation
              ? "Ce module est en préparation, on te prévient dès qu'il est prêt."
              : "C'est ton point de départ. Tu verras tout le parcours juste après, l'autre famille comprise."}
          </p>
        </div>

        {saveState === "anon" ? (
          <div className="quiz-confirm">
            <span className="quiz-confirm-q">Sauvegarde ton point de départ</span>
            <p className="quiz-confirm-copy">
              Sans compte, ton résultat et ta progression restent sur cet appareil. Avec un
              compte, tu les retrouves partout.
            </p>
            <Link href={accountHref} className="btn">
              Créer mon compte et commencer →
            </Link>
            <Link href={targetHref} className="quiz-choose">
              Continuer sans compte →
            </Link>
            <button type="button" className="quiz-choose" onClick={chooseMyself}>
              Choisir un autre module
            </button>
          </div>
        ) : (
          <div className="quiz-confirm">
            <span className="quiz-confirm-q">Ton point de départ est prêt</span>
            <Link href={targetHref} className="btn">
              {reco.hero.cta?.label ?? "Voir les modules disponibles"} →
            </Link>
            <button type="button" className="quiz-choose" onClick={chooseMyself}>
              Choisir un autre module
            </button>
          </div>
        )}

        {saveState === "saved" && (
          <p className="quiz-saved">✓ Ton parcours est enregistré sur ton compte.</p>
        )}
        {saveState === "error" && (
          <p className="quiz-save-err">
            On n&apos;a pas pu enregistrer ton parcours. Tu peux continuer, réessaie plus tard.
          </p>
        )}

        <button type="button" className="quiz-restart" onClick={restart}>
          Refaire le test
        </button>
      </div>
    );
  }

  const flow = questionFlow(answers);
  const idx = Math.min(step, flow.length - 1);
  const q = flow[idx];
  const current = answers[q.id];
  const displayTotal = branchDone(answers) ? flow.length : 6;

  return (
    <div className="quiz">
      <div className="quiz-progress">
        <div className="quiz-progress-bar" style={{ width: `${(idx / displayTotal) * 100}%` }} />
      </div>
      <div className="quiz-count">
        Question {idx + 1} sur {displayTotal} · {q.role}
      </div>

      <h2 className="quiz-question">{q.question}</h2>
      {q.hint && <p className="quiz-hint">{q.hint}</p>}

      <div className="quiz-options">
        {q.options.map((o) => (
          <button
            type="button"
            key={o.value}
            className={`quiz-option ${current === o.value ? "selected" : ""}`}
            onClick={() => choose(q.id, o.value)}
          >
            <span>{o.label}</span>
            {current === o.value && <span className="quiz-opt-dot" aria-hidden />}
          </button>
        ))}
      </div>

      {idx > 0 && (
        <button type="button" className="quiz-back" onClick={() => setStep(idx - 1)}>
          ← Revenir
        </button>
      )}
    </div>
  );
}

function branchDone(answers: Answers): boolean {
  return ["envie", "facon", "vision"].every((id) => answers[id]);
}
