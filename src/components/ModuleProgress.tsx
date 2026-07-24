"use client";

import Link from "next/link";
import {
  computeStats,
  substepAnchor,
  useModuleProgress,
  type EtapeLite,
} from "@/lib/progress";

// Progression et action principale de démarrage ou de reprise du module.
export default function ModuleProgress({
  moduleKey,
  basePath,
  etapes,
  completionHref,
  completionLabel,
}: {
  moduleKey: string;
  basePath: string;
  etapes: EtapeLite[];
  completionHref?: string;
  completionLabel?: string;
}) {
  const { done, mounted, started } = useModuleProgress(moduleKey);
  if (!mounted) return null;

  const stats = computeStats(etapes, done, started);
  const pct = stats.total ? Math.round((stats.doneCount / stats.total) * 100) : 0;
  const t = stats.current;

  let cta = "Commencer le module";
  let href = `${basePath}/${etapes[0]?.slug}`;
  if (stats.allDone) {
    cta = completionLabel ?? "Revoir le module";
    href = completionHref ?? href;
  } else if (t) {
    href = `${basePath}/${t.etapeSlug}#${substepAnchor(t.etapeSlug, t.subIndex)}`;
    if (stats.started) {
      cta = `Reprendre à la sous-étape ${t.etapeNum}.${t.subIndex + 1}`;
    }
  }

  return (
    <div className="mprogress">
      <div className="mprogress-top">
        <span className="mprogress-count">
          {stats.doneCount} / {stats.total} sous-étapes faites
        </span>
        <Link className="btn" href={href}>
          {cta} →
        </Link>
      </div>
      <div className="mprogress-bar" aria-hidden>
        <div className="mprogress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
