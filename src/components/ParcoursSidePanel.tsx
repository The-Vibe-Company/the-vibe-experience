"use client";

import Link from "next/link";
import { etapesDetail, type EtapeDetail } from "@/lib/module-faire-un-site";
import { etapesDetailSkill } from "@/lib/module-creer-un-skill";
import { etapesDetailAutomatisation } from "@/lib/module-automatisation";
import { computeStats, useModuleProgress, type EtapeLite } from "@/lib/progress";

// Panneau latéral de l'accueil du parcours. Avant de commencer : ce qu'il faut
// savoir pour se lancer, et le quiz pour être orienté. Dès qu'un module est
// entamé : où on en est sur chacun, et la prochaine action pour reprendre.

const toLite = (etapes: EtapeDetail[]): EtapeLite[] =>
  etapes.map((e) => ({ slug: e.slug, num: e.num, titre: e.titre, sousCount: e.sous.length }));

const MODULES = [
  { key: "/module", label: "Module 01", titre: "Faire un site", etapes: toLite(etapesDetail) },
  {
    key: "/creer-un-skill",
    label: "Module 02",
    titre: "Créer ton premier skill",
    etapes: toLite(etapesDetailSkill),
  },
  {
    key: "/automatiser-ton-travail",
    label: "Module 03",
    titre: "Automatise ton travail",
    etapes: toLite(etapesDetailAutomatisation),
  },
];

export default function ParcoursSidePanel() {
  const p0 = useModuleProgress(MODULES[0].key);
  const p1 = useModuleProgress(MODULES[1].key);
  const p2 = useModuleProgress(MODULES[2].key);
  const progress = [p0, p1, p2];

  const mods = MODULES.map((m, i) => {
    const p = progress[i];
    return { ...m, stats: computeStats(m.etapes, p.mounted ? p.done : [], p.mounted && p.started) };
  });

  const anyStarted = progress.every((p) => p.mounted) && mods.some((m) => m.stats.started);

  const links = (
    <div className="pcx-side-more">
      <span className="label">Autour du parcours</span>
      <div className="module-side-links">
        <Link href="/ressources">Les ressources : outils, skills et prompts →</Link>
        <Link href="/journal">Le journal de bord, l&apos;AI Journey en direct →</Link>
        <Link href="/juge">Le juge : fais évaluer ton site →</Link>
      </div>
    </div>
  );

  if (!anyStarted) {
    return (
      <aside className="module-side" aria-label="Avant de te lancer">
        <span className="label">Avant de te lancer</span>
        <div className="module-side-list">
          <div className="module-side-row">
            <span>Niveau</span>
            <strong>Débutant, zéro code requis</strong>
          </div>
          <div className="module-side-row">
            <span>Budget</span>
            <strong>Claude Pro (~20 €/mois), le reste gratuit</strong>
          </div>
          <div className="module-side-row">
            <span>Rythme</span>
            <strong>À ton rythme, ta progression est gardée</strong>
          </div>
        </div>
        <Link className="module-side-next" href="/demarrer">
          <span>Tu hésites ?</span>
          <strong>On t&apos;oriente en deux minutes →</strong>
        </Link>
        {links}
      </aside>
    );
  }

  const active = mods.find((m) => m.stats.started && !m.stats.allDone && m.stats.current);
  const nextUp = active ? null : mods.find((m) => !m.stats.started);
  const cur = active?.stats.current ?? null;

  return (
    <aside className="module-side" aria-label="Où tu en es dans le parcours">
      <span className="label">Où tu en es</span>
      {active && cur ? (
        <Link className="module-side-next" href={`${active.key}/${cur.etapeSlug}`}>
          <span>Prochaine action</span>
          <strong>
            {active.titre} : reprendre à la sous-étape {cur.etapeNum}.{cur.subIndex + 1} →
          </strong>
        </Link>
      ) : nextUp ? (
        <Link className="module-side-next" href={nextUp.key}>
          <span>Prochaine action</span>
          <strong>Commencer « {nextUp.titre} » →</strong>
        </Link>
      ) : (
        <Link className="module-side-next" href="/juge">
          <span>Prochaine action</span>
          <strong>Fais évaluer ton site par le juge →</strong>
        </Link>
      )}
      <div className="module-side-list">
        {mods.map((m) => (
          <div className="module-side-row" key={m.key}>
            <span>
              {m.label} · {m.titre}
            </span>
            <strong>
              {m.stats.allDone
                ? "✓ Terminé"
                : m.stats.started
                  ? `En cours · ${m.stats.doneCount}/${m.stats.total} sous-étapes`
                  : "Pas commencé"}
            </strong>
          </div>
        ))}
      </div>
      {links}
    </aside>
  );
}
