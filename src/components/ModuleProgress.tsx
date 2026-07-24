"use client";

import Link from "next/link";
import { useModuleProgress, computeStats, type EtapeLite } from "@/lib/progress";

// Progression et action principale de démarrage ou de reprise du module.
export default function ModuleProgress({
  moduleKey,
  basePath,
  etapes,
}: {
  moduleKey: string;
  basePath: string;
  etapes: EtapeLite[];
}) {
  const { done, mounted, started } = useModuleProgress(moduleKey);
  if (!mounted) return null;

  const stats = computeStats(etapes, done, started);
  const t = stats.current;

  let cta = "Commencer le module";
  let href = `${basePath}/${etapes[0]?.slug}`;
  if (stats.allDone) {
    cta = "Revoir le module";
  } else if (t) {
    href = `${basePath}/${t.etapeSlug}`;
    if (stats.doneCount > 0) {
      cta = `Reprendre à la sous-étape ${t.etapeNum}.${t.subIndex + 1}`;
    }
  }

  return (
    <div className="mprogress">
      <Link className="btn" href={href}>
        {cta} →
      </Link>
    </div>
  );
}
