"use client";

import Link from "next/link";
import {
  computeStats,
  substepAnchor,
  useModuleProgress,
  type EtapeLite,
} from "@/lib/progress";

type SideItem = {
  label: string;
  value: string;
};

export default function ModuleSidePanel({
  moduleKey,
  basePath,
  etapes,
  facts,
  finishedHref,
  finishedLabel,
}: {
  moduleKey: string;
  basePath: string;
  etapes: EtapeLite[];
  facts: SideItem[];
  finishedHref: string;
  finishedLabel: string;
}) {
  const { done, mounted, started: moduleStarted } = useModuleProgress(moduleKey);
  const stats = computeStats(etapes, mounted ? done : [], mounted && moduleStarted);
  const pct = stats.total ? Math.round((stats.doneCount / stats.total) * 100) : 0;
  const started = mounted && stats.started;
  const prerequisites = (
    <Link href={`${basePath}/${etapes[0]?.slug}#ce-quil-te-faut`}>
      Ce qu&apos;il te faut sous la main →
    </Link>
  );

  if (started && stats.allDone) {
    return (
      <aside className="module-side" aria-label="Où tu en es dans le module">
        <span className="erail-cap module-side-cap">Où tu en es</span>
        <p className="module-side-state">✓ Module terminé. Bien joué.</p>
        <Link className="module-side-next" href={finishedHref}>
          <span>Prochaine action</span>
          <strong>{finishedLabel} →</strong>
        </Link>
        <div className="module-side-links">
          <Link href={`${basePath}/${etapes[0]?.slug}`}>Revoir le module →</Link>
          {prerequisites}
        </div>
      </aside>
    );
  }

  if (started && stats.current) {
    const current = stats.current;
    const currentStep = etapes.find((etape) => etape.slug === current.etapeSlug);

    return (
      <aside className="module-side" aria-label="Où tu en es dans le module">
        <span className="erail-cap module-side-cap">Où tu en es</span>
        <Link
          className="module-side-next"
          href={`${basePath}/${current.etapeSlug}#${substepAnchor(
            current.etapeSlug,
            current.subIndex,
          )}`}
        >
          <span>Prochaine action</span>
          <strong>
            Reprendre à la sous-étape {current.etapeNum}.{current.subIndex + 1} →
          </strong>
        </Link>
        <div className="module-side-list">
          <div className="module-side-row">
            <span>Étape en cours</span>
            <strong>
              {current.etapeNum} · {currentStep?.titre}
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
        <div className="module-side-links">{prerequisites}</div>
      </aside>
    );
  }

  return (
    <aside className="module-side" aria-label="Avant de te lancer">
      <span className="erail-cap module-side-cap">Avant de te lancer</span>
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
      <div className="module-side-links">{prerequisites}</div>
    </aside>
  );
}
