"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { EtapeDetail } from "@/lib/module-faire-un-site";
import { etapesDetail } from "@/lib/module-faire-un-site";
import { etapesDetailSkill } from "@/lib/module-creer-un-skill";
import { etapesDetailAutomatisation } from "@/lib/module-automatisation";
import { etapesDetailDevis } from "@/lib/module-devis";
import { etapesDetailFacture } from "@/lib/module-facture";
import { computeStats, useAnyModuleStarted, useModuleProgress } from "@/lib/progress";

type Branche = "construire" | "automatiser";

// Les deux catégories sont présentées côte à côte, à égalité : certains
// visiteurs viennent pour construire, d'autres uniquement pour automatiser.
// Chaque catégorie a son titre hors du bloc, et un panneau qui contient ses
// modules : le cadre dit l'appartenance.

const businessSoon = [
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
  recommended = false,
}: {
  moduleKey: string;
  href: string;
  title: string;
  desc: string;
  idleStatus: string;
  starter?: boolean;
  recommended?: boolean;
}) {
  const { done, mounted, started } = useModuleProgress(moduleKey);
  const etapes: EtapeDetail[] =
    moduleKey === "/module"
      ? etapesDetail
      : moduleKey === "/creer-un-skill"
        ? etapesDetailSkill
        : moduleKey === "/automatiser-tes-devis"
          ? etapesDetailDevis
          : moduleKey === "/automatiser-tes-factures"
            ? etapesDetailFacture
            : etapesDetailAutomatisation;
  const lite = etapes.map((e) => ({
    slug: e.slug,
    num: e.num,
    titre: e.titre,
    sousCount: e.sous.length,
  }));
  const stats = computeStats(lite, mounted ? done : [], mounted && started);
  const cur = mounted && stats.started && !stats.allDone;

  let status = starter || recommended ? "Commence ici →" : idleStatus;
  let statusClass = starter || recommended ? " cur" : "";
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
  const [recommendedHref, setRecommendedHref] = useState<string | null>(null);
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
          setRecommendedHref(null);
          return;
        }

        if (
          !r.dismissed &&
          (r.branche === "construire" || r.branche === "automatiser")
        ) {
          setReco(r.branche);
          setRecommendedHref(typeof r.moduleHref === "string" ? r.moduleHref : null);
        }
      } catch {}
    });
  }, [moduleStarted.started]);

  // « Pas convaincu ? » : on retire le conseil, l'utilisateur choisit seul.
  const ignorerConseil = () => {
    setReco(null);
    setRecommendedHref(null);
    try {
      const raw = localStorage.getItem("tve_quiz_reco");
      if (raw) {
        const r = JSON.parse(raw);
        r.dismissed = true;
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
              recommended={recommendedHref === "/module"}
            />
            <ModuleRow
              moduleKey="/creer-un-skill"
              href="/creer-un-skill"
              title="Créer ton premier skill"
              desc="Tu as utilisé des skills tout faits ; celui-ci t'apprend à fabriquer le tien, réutilisable dans ton prochain produit."
              idleStatus="Après le module 1"
              recommended={recommendedHref === "/creer-un-skill"}
            />
            <ModuleRow
              moduleKey="/automatiser-ton-travail"
              href="/automatiser-ton-travail"
              title="Automatise ton travail"
              desc="Des sauvegardes, des garde-fous et des rendez-vous qui se déclenchent au bon moment."
              idleStatus="Disponible"
              recommended={recommendedHref === "/automatiser-ton-travail"}
            />
          </>,
        )}
        {colonne(
          "automatiser",
          "Automatise ton business",
          "Tu confies à l'IA les tâches qui te font perdre du temps pour obtenir un résultat sans tout construire toi-même.",
          null,
          <>
            <ModuleRow
              moduleKey="/automatiser-tes-devis"
              href="/automatiser-tes-devis"
              title="Automatise tes devis"
              desc="« Devis pour Madame Martin : chauffe-eau, 980 euros », et le devis conforme sort, numéroté, prêt en PDF. Un skill offert."
              idleStatus="Disponible"
              recommended={recommendedHref === "/automatiser-tes-devis"}
            />
            <ModuleRow
              moduleKey="/automatiser-tes-factures"
              href="/automatiser-tes-factures"
              title="Automatise tes factures"
              desc="Ton devis signé devient facture en une phrase : acompte, solde, avoir. Un skill offert, compagnon du skill devis."
              idleStatus="Disponible"
              recommended={recommendedHref === "/automatiser-tes-factures"}
            />
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
