"use client";

import Link from "next/link";
import { computeStats, useModuleProgress, type EtapeLite } from "@/lib/progress";

type SideItem = {
  label: string;
  value: string;
};

// Panneau latéral de la page module : contexte, progression et lien secondaire.
// Le bouton principal de démarrage ou de reprise reste dans la colonne centrale.
export default function ModuleSidePanel({
  moduleKey,
  basePath,
  etapes,
  facts,
  jugeHref = "/juge",
  jugeLabel = "Fais évaluer ton site par le juge",
}: {
  moduleKey: string;
  basePath: string;
  etapes: EtapeLite[];
  facts: SideItem[];
  jugeHref?: string;
  jugeLabel?: string;
}) {
  const { done, mounted, started: moduleStarted } = useModuleProgress(moduleKey);
  const stats = computeStats(etapes, mounted ? done : [], mounted && moduleStarted);
  const pct = stats.total ? Math.round((stats.doneCount / stats.total) * 100) : 0;
  const started = mounted && stats.doneCount > 0;

  // Toujours accessible, dans les trois états et depuis n'importe quelle page
  // d'étape : la liste vit dans la sous-étape 0.1, avec les outils du module.
  const prerequis = (
    <Link href={`${basePath}/${etapes[0]?.slug}`}>Ce qu&apos;il te faut sous la main →</Link>
  );

  if (started && stats.allDone) {
    return (
      <aside className="module-side" aria-label="Où tu en es dans le module">
        <span className="label">Où tu en es</span>
        <p className="module-side-state">✓ Module terminé. Bien joué.</p>
        <Link className="module-side-next" href={jugeHref}>
          <span>Prochaine action</span>
          <strong>{jugeLabel} →</strong>
        </Link>
        <div className="module-side-links">
          <Link href={`${basePath}/${etapes[0]?.slug}`}>Revoir le module →</Link>
          {prerequis}
        </div>
      </aside>
    );
  }

  if (started && stats.current) {
    const cur = stats.current;
    const curEtape = etapes.find((e) => e.slug === cur.etapeSlug);
    return (
      <aside className="module-side" aria-label="Où tu en es dans le module">
        <span className="label">Où tu en es</span>
        <Link className="module-side-next" href={`${basePath}/${cur.etapeSlug}`}>
          <span>Prochaine action</span>
          <strong>
            Reprendre à la sous-étape {cur.etapeNum}.{cur.subIndex + 1} →
          </strong>
        </Link>
        <div className="module-side-list">
          <div className="module-side-row">
            <span>Étape en cours</span>
            <strong>
              {cur.etapeNum} · {curEtape?.titre}
            </strong>
          </div>
        </div>
        <div className="module-side-progress" aria-label="Progression du module">
          <span>
            <strong>
              {stats.doneCount}/{stats.total}
            </strong>
            <em>sous-étapes</em>
          </span>
          <span>
            <strong>{pct}%</strong>
            <em>fait</em>
          </span>
        </div>
        <div className="module-side-links">{prerequis}</div>
      </aside>
    );
  }

  return (
    <aside className="module-side" aria-label="Avant de te lancer">
      <span className="label">Avant de te lancer</span>
      <div className="module-side-list">
        {facts.map((fact) => (
          <div className="module-side-row" key={fact.label}>
            <span>{fact.label}</span>
            <strong>{fact.value}</strong>
          </div>
        ))}
      </div>
      <Link className="module-side-next" href={`${basePath}/${etapes[0]?.slug}`}>
        <span>Par ici</span>
        <strong>Commencer le module →</strong>
      </Link>
      <div className="module-side-links">{prerequis}</div>
    </aside>
  );
}
