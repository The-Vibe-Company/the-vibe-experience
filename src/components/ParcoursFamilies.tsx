"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { EtapeDetail } from "@/lib/module-faire-un-site";
import { etapesDetail } from "@/lib/module-faire-un-site";
import { etapesDetailSkill } from "@/lib/module-creer-un-skill";
import { etapesDetailAutomatisation } from "@/lib/module-automatisation";
import { computeStats, useAnyModuleStarted, useModuleProgress } from "@/lib/progress";

type Branche = "construire" | "automatiser";

// Les deux catégories sont présentées côte à côte, à égalité : certains
// visiteurs viennent pour construire, d'autres uniquement pour automatiser.
// Chaque catégorie a son titre hors du bloc, et un panneau qui contient ses
// modules : le cadre dit l'appartenance.

const businessSoon = [
  {
    titre: "Automatise tes devis",
    desc: "Ton devis prêt en quelques minutes au lieu d'une heure, au bon format à chaque fois.",
  },
  {
    titre: "Automatise tes factures",
    desc: "Tes factures générées et suivies sans que tu y penses.",
  },
  {
    titre: "Tiens ta compta",
    desc: "Le récap qui sort tout seul, chaque mois, prêt à envoyer au comptable.",
  },
  { titre: "Gère tes mails", desc: "Trie, réponds et retrouve tes messages sans y passer ta matinée." },
  { titre: "Gère ton agenda", desc: "Tes rendez-vous et tes rappels organisés à ta place." },
];

function ModuleRow({
  moduleKey,
  href,
  title,
  desc,
  idleStatus,
  starter = false,
}: {
  moduleKey: string;
  href: string;
  title: string;
  desc: string;
  idleStatus: string;
  starter?: boolean;
}) {
  const { done, mounted } = useModuleProgress(moduleKey);
  const etapes: EtapeDetail[] =
    moduleKey === "/module"
      ? etapesDetail
      : moduleKey === "/creer-un-skill"
        ? etapesDetailSkill
        : etapesDetailAutomatisation;
  const lite = etapes.map((e) => ({
    slug: e.slug,
    num: e.num,
    titre: e.titre,
    sousCount: e.sous.length,
  }));
  const stats = computeStats(lite, mounted ? done : []);
  const cur = mounted && stats.doneCount > 0 && !stats.allDone;

  let status = starter ? "Commence ici →" : idleStatus;
  let statusClass = starter ? " cur" : "";
  if (mounted && stats.allDone) {
    status = "✓ Terminé";
    statusClass = " done";
  } else if (cur) {
    status = `Reprendre · ${stats.doneCount}/${stats.total} →`;
    statusClass = " cur";
  }

  return (
    <Link href={href} className="pcat-row">
      <span>
        <span className="pcat-row-t">{title}</span>
        <span className="pcat-row-d">{desc}</span>
      </span>
      <span className={`pcat-row-s${statusClass}`}>{status}</span>
    </Link>
  );
}

export default function ParcoursFamilies() {
  const [reco, setReco] = useState<Branche | null>(null);
  const [quizFait, setQuizFait] = useState(false);
  const moduleStarted = useAnyModuleStarted();

  // La reco du quiz marque la catégorie conseillée. Elle disparaît dès qu'un
  // module est lancé, ou quand l'utilisateur choisit de passer outre.
  useEffect(() => {
    queueMicrotask(() => {
      try {
        const raw = localStorage.getItem("tve_quiz_reco");
        if (!raw) return;
        setQuizFait(true);
        const r = JSON.parse(raw);

        if (moduleStarted.started) {
          setReco(null);
          if (r.branche) {
            delete r.branche;
            localStorage.setItem("tve_quiz_reco", JSON.stringify(r));
          }
          return;
        }

        if (r.branche === "construire" || r.branche === "automatiser") setReco(r.branche);
      } catch {}
    });
  }, [moduleStarted.started]);

  // « Pas convaincu ? » : on retire le conseil, l'utilisateur choisit seul.
  const ignorerConseil = () => {
    setReco(null);
    try {
      const raw = localStorage.getItem("tve_quiz_reco");
      if (raw) {
        const r = JSON.parse(raw);
        delete r.branche;
        localStorage.setItem("tve_quiz_reco", JSON.stringify(r));
      }
    } catch {}
  };

  const colonne = (
    b: Branche,
    titre: string,
    desc: string,
    tag: string | null,
    rows: React.ReactNode,
  ) => (
    <div className="pcat-col">
      <div className="pcat-head">
        <h2 className="pcat-h">{titre}</h2>
        {tag && <span className="pcat-soon">{tag}</span>}
      </div>
      <p className="pcat-sub">{desc}</p>
      <div className={`pcat-panel${reco === b ? " reco" : ""}`}>
        {reco === b && <span className="pc-reco-tag">Conseillé d&apos;après ton quiz</span>}
        {rows}
      </div>
      {reco === b && (
        <button type="button" className="pcat-free" onClick={ignorerConseil}>
          Pas convaincu par le conseil ? Choisis toi-même, rien n&apos;est verrouillé.
        </button>
      )}
    </div>
  );

  return (
    <div className="pcat">
      <div className="pcat-grid">
        {colonne(
          "construire",
          "Apprendre à construire",
          "Tu fabriques tes propres outils, pas à pas, et tu apprends en le faisant.",
          null,
          <>
            <ModuleRow
              moduleKey="/module"
              href="/module"
              title="Faire un site"
              desc="De ton idée à sa mise en ligne : tu construis ton propre site en découvrant les outils au bon moment."
              idleStatus="Commence ici →"
              starter
            />
            <ModuleRow
              moduleKey="/creer-un-skill"
              href="/creer-un-skill"
              title="Créer ton premier skill"
              desc="Tu as utilisé des skills tout faits ; celui-ci t'apprend à fabriquer le tien, réutilisable dans ton prochain produit."
              idleStatus="Après le module 1"
            />
            <ModuleRow
              moduleKey="/automatiser-ton-travail"
              href="/automatiser-ton-travail"
              title="Automatise ton travail"
              desc="Des sauvegardes, des garde-fous et des rendez-vous qui se déclenchent au bon moment."
              idleStatus="En préparation"
            />
          </>,
        )}
        {colonne(
          "automatiser",
          "Automatise ton business",
          "Tu confies à l'IA les tâches qui te font perdre du temps pour obtenir un résultat sans tout construire toi-même.",
          "En préparation",
          <>
            {businessSoon.map((m) => (
              <div className="pcat-row soon" key={m.titre}>
                <span>
                  <span className="pcat-row-t">{m.titre}</span>
                  <span className="pcat-row-d">{m.desc}</span>
                </span>
                <span className="pcat-row-s">Bientôt</span>
              </div>
            ))}
          </>,
        )}
      </div>

      {!quizFait && !moduleStarted.started && (
        <div className="pcat-quiz">
          <p>
            Tu hésites entre les deux ? Deux minutes de questions et on te dit où commencer. Jamais
            obligatoire.
          </p>
          <Link href="/demarrer" className="btn btn-ghost">
            Faire le quiz →
          </Link>
        </div>
      )}
    </div>
  );
}
