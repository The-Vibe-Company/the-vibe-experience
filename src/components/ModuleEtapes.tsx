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
  const { done, mounted } = useModuleProgress(moduleKey);
  const stats = computeStats(
    etapes.map((e) => ({ slug: e.slug, num: e.num, titre: e.titre, sousCount: e.sousCount })),
    mounted ? done : [],
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
            <span className="met-body">
              <span className="met-title">{e.titre}</span>
              <span className="met-desc">{e.obj}</span>
              <span className="met-meta">
                {e.tagLabel} · {e.dur} · {e.sousCount} sous-étape{e.sousCount > 1 ? "s" : ""}
              </span>
            </span>
            <span className="met-status">
              {mounted && es.complete && <span className="met-done">✓ Terminée</span>}
              {mounted && isCurrent && !es.complete && (
                <span className="met-cur">
                  ● En cours · {es.done}/{es.total}
                </span>
              )}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
