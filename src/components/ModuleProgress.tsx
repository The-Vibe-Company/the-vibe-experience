"use client";

import Link from "next/link";
import { useModuleProgress, computeStats, type EtapeLite } from "@/lib/progress";

// En-tête de progression sur la page d'un module : sous-étapes faites + reprise au bon endroit.
export default function ModuleProgress({
  moduleKey,
  basePath,
  etapes,
}: {
  moduleKey: string;
  basePath: string;
  etapes: EtapeLite[];
}) {
  const { done, mounted } = useModuleProgress(moduleKey);
  if (!mounted) return null;

  const stats = computeStats(etapes, done);
  const pct = stats.total ? Math.round((stats.doneCount / stats.total) * 100) : 0;
  const t = stats.current;

  let cta = `Commencer à la sous-étape ${etapes[0]?.num}.1`;
  let href = `${basePath}/${etapes[0]?.slug}`;
  if (stats.allDone) {
    cta = "Revoir le module";
  } else if (t) {
    cta = `${stats.started ? "Reprendre" : "Commencer"} à la sous-étape ${t.etapeNum}.${t.subIndex + 1}`;
    href = `${basePath}/${t.etapeSlug}`;
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
