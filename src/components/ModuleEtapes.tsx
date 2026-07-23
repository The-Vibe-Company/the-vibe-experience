"use client";

import Link from "next/link";
import { useModuleProgress, computeStats } from "@/lib/progress";

export type EtapeCard = {
  slug: string;
  num: string;
  titre: string;
  obj: string;
  tagLabel: string;
  dur: string;
  sousCount: number;
};

// Liste des étapes d'un module en filets (design 3a) : numéro, titre, description, méta, statut.
export default function ModuleEtapes({
  moduleKey,
  basePath,
  etapes,
}: {
  moduleKey: string;
  basePath: string;
  etapes: EtapeCard[];
}) {
  const { done, mounted, started } = useModuleProgress(moduleKey);
  const stats = computeStats(
    etapes.map((e) => ({ slug: e.slug, num: e.num, titre: e.titre, sousCount: e.sousCount })),
    mounted ? done : [],
    mounted && started,
  );
  const currentSlug = stats.current?.etapeSlug;

  return (
    <div className="metapes">
      {etapes.map((e, idx) => {
        const es = stats.etapes[idx];
        const isCurrent = mounted && e.slug === currentSlug;
        return (
          <Link
            className={`met-row ${isCurrent ? "cur" : ""} ${es.complete ? "fait" : ""}`}
            href={`${basePath}/${e.slug}`}
            key={e.slug}
          >
            <span className="met-num" aria-hidden>
              {es.complete ? "✓" : e.num}
            </span>
            <span className="met-title">{e.titre}</span>
            {mounted && (es.complete || isCurrent) && (
              <span className="met-status">
                {es.complete && <span className="met-done">✓ Terminée</span>}
                {isCurrent && !es.complete && (
                  <span className="met-cur">
                    ● En cours · {es.done}/{es.total}
                  </span>
                )}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
