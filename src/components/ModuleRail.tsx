"use client";

import Link from "next/link";
import type { EtapeDetail } from "@/lib/module-faire-un-site";
import { useModuleProgress } from "@/lib/progress";

// Rail de progression à gauche des pages d'étape : les étapes du module, l'étape courante
// surlignée, ses sous-étapes déroulées, et une coche sur les étapes déjà faites.
export default function ModuleRail({
  etapes,
  currentSlug,
  basePath,
  moduleLabel,
}: {
  etapes: EtapeDetail[];
  currentSlug: string;
  basePath: string;
  moduleLabel: string;
}) {
  const { isDone, mounted } = useModuleProgress(basePath);
  const doneCount = mounted ? etapes.filter((e) => isDone(e.slug)).length : 0;

  return (
    <nav className="erail" aria-label={`Étapes du module ${moduleLabel}`}>
      <div className="erail-label">{moduleLabel}</div>
      <ol className="erail-list">
        {etapes.map((e) => {
          const cur = e.slug === currentSlug;
          const fait = mounted && isDone(e.slug);
          return (
            <li key={e.slug} className={`${cur ? "cur" : ""} ${fait ? "fait" : ""}`}>
              <Link href={`${basePath}/${e.slug}`} aria-current={cur ? "step" : undefined}>
                <span className="erail-num" aria-hidden>
                  {fait ? "✓" : e.num}
                </span>
                <span className="erail-t">{e.titre}</span>
              </Link>
              {cur && e.sous.length > 0 && (
                <ul className="erail-sub">
                  {e.sous.map((s, i) => (
                    <li key={i}>{s.titre}</li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ol>
      {mounted && doneCount > 0 && (
        <div className="erail-progress">
          {doneCount} / {etapes.length} faites
        </div>
      )}
    </nav>
  );
}
