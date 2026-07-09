"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { questions, computeReco, type Answers } from "@/lib/quiz";
import { createClient } from "@/lib/supabase/client";

type SaveState = "idle" | "saving" | "saved" | "anon" | "error";

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>("idle");

  const total = questions.length;

  useEffect(() => {
    if (!done) return;
    (async () => {
      const reco = computeReco(answers);
      const record = { niveau: reco.niveau, objectif: reco.projetLabel };
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        try {
          localStorage.setItem("tve_quiz_reco", JSON.stringify(record));
        } catch {}
        setSaveState("anon");
        return;
      }
      setSaveState("saving");
      const { error } = await supabase.from("profiles").update(record).eq("id", user.id);
      setSaveState(error ? "error" : "saved");
    })();
  }, [done, answers]);

  function choose(qid: string, value: string) {
    const next = { ...answers, [qid]: value };
    setAnswers(next);
    // petit délai pour que la sélection se voie avant de passer à la suite
    setTimeout(() => {
      if (step < total - 1) setStep(step + 1);
      else setDone(true);
    }, 180);
  }

  function restart() {
    setAnswers({});
    setStep(0);
    setDone(false);
    setSaveState("idle");
  }

  if (done) {
    const reco = computeReco(answers);
    return (
      <div className="quiz-result">
        <div className="label">Ta recommandation</div>
        <h2>
          Tu es plutôt <em>{reco.niveau}</em>.
        </h2>
        <p className="quiz-result-sub">
          Rien n&apos;est verrouillé : tous les modules restent accessibles. On te propose juste le
          meilleur point de départ, {reco.ton}, {reco.rythme}.
        </p>

        <div className="reco-card reco-main">
          <div className="reco-tag">On commence ici</div>
          <h3>{reco.moduleDepart.titre}</h3>
          <p>{reco.moduleDepart.note}</p>
          <Link href={reco.moduleDepart.href} className="btn">
            Ouvrir « {reco.moduleDepart.titre} »
          </Link>
        </div>

        <div className="reco-grid">
          <div className="reco-card">
            <div className="reco-tag">Ton projet</div>
            <p>
              Tu veux créer {reco.projetLabel}. Les exercices s&apos;appliqueront à ton idée à toi,
              pas à un exemple imposé.
            </p>
          </div>
          <div className="reco-card">
            <div className="reco-tag">Les skills</div>
            <p>{reco.skills}</p>
          </div>
        </div>

        {saveState === "saved" && (
          <p className="quiz-saved">✓ Ton parcours est enregistré sur ton compte.</p>
        )}
        {saveState === "anon" && (
          <div className="reco-card quiz-anon">
            <div className="reco-tag">Garde ta progression</div>
            <p>
              Crée ton compte pour sauvegarder ton parcours et reprendre là où tu t&apos;arrêtes.
            </p>
            <Link href="/inscription" className="btn">
              Créer mon compte
            </Link>
          </div>
        )}
        {saveState === "error" && (
          <p className="quiz-save-err">
            On n&apos;a pas pu enregistrer ton parcours. Tu peux continuer, réessaie plus tard.
          </p>
        )}

        <button className="btn-ghost quiz-restart" onClick={restart}>
          Refaire le test
        </button>
      </div>
    );
  }

  const q = questions[step];
  const current = answers[q.id];

  return (
    <div className="quiz">
      <div className="quiz-progress">
        <div className="quiz-progress-bar" style={{ width: `${(step / total) * 100}%` }} />
      </div>
      <div className="quiz-count">
        Question {step + 1} sur {total} · {q.role}
      </div>

      <h2 className="quiz-question">{q.question}</h2>
      {q.hint && <p className="quiz-hint">{q.hint}</p>}

      <div className="quiz-options">
        {q.options.map((o) => (
          <button
            key={o.value}
            className={`quiz-option ${current === o.value ? "selected" : ""}`}
            onClick={() => choose(q.id, o.value)}
          >
            {o.label}
          </button>
        ))}
      </div>

      {step > 0 && (
        <button className="quiz-back" onClick={() => setStep(step - 1)}>
          ← Revenir
        </button>
      )}
    </div>
  );
}
