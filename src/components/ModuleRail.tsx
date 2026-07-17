"use client";

import Link from "next/link";
import type { EtapeDetail } from "@/lib/module-faire-un-site";
import { useModuleProgress, computeStats, sousId, useMarkModuleStarted } from "@/lib/progress";

// Rail de progression (design 3a/2a) : module, barre de progression par sous-étape,
// bouton « Reprendre », et sommaire des étapes qui déploie la courante.
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
  useMarkModuleStarted(basePath);

  const { isDone, done, mounted, started } = useModuleProgress(basePath);
  const lite = etapes.map((e) => ({ slug: e.slug, num: e.num, titre: e.titre, sousCount: e.sous.length }));
  const stats = computeStats(lite, mounted ? done : [], mounted && started);
  const pct = stats.total ? Math.round((stats.doneCount / stats.total) * 100) : 0;

  // Sur une page d'étape, on surligne cette étape. Sur l'accueil (currentSlug vide), on surligne l'étape courante.
  const highlightSlug = currentSlug || stats.current?.etapeSlug || etapes[0]?.slug;

  const t = stats.current;
  let cta: string | null = null;
  let ctaHref = `${basePath}/${etapes[0].slug}`;
  if (mounted) {
    if (stats.allDone) cta = "Revoir le module";
    else if (t) {
      cta = `${stats.started ? "Reprendre" : "Commencer"} à la sous-étape ${t.etapeNum}.${t.subIndex + 1} →`;
      ctaHref = `${basePath}/${t.etapeSlug}`;
    }
  }

  return (
    <nav className="erail" aria-label={`Progression du module ${moduleLabel}`}>
      <div className="erail-module">
        <span className="erail-cap">Module</span>
        <span className="erail-name">{moduleLabel}</span>
      </div>

      {mounted && (
        <div className="erail-prog">
          <div className="erail-prog-top">
            <span className="erail-cap">Progression</span>
            <span className="erail-count">
              {stats.doneCount}/{stats.total}
            </span>
          </div>
          <div className="erail-bar" aria-hidden>
            <div className="erail-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}

      {cta && (
        <Link className="btn erail-btn" href={ctaHref}>
          {cta}
        </Link>
      )}

      <ol className="erail-list">
        {stats.etapes.map((es, idx) => {
          const cur = es.slug === highlightSlug;
          const etape = etapes[idx];
          const curSub = etape.sous.findIndex((_, i) => mounted && !isDone(sousId(es.slug, i)));
          return (
            <li key={es.slug} className={`${cur ? "cur" : ""} ${es.complete ? "fait" : ""}`}>
              <Link href={`${basePath}/${es.slug}`} aria-current={cur ? "step" : undefined}>
                <span className="erail-num" aria-hidden>
                  {es.complete ? "✓" : es.num}
                </span>
                <span className="erail-t">{es.titre}</span>
                <span className="erail-sc">{mounted ? `${es.done}/${es.total}` : es.total}</span>
              </Link>
              {cur && (
                <ul className="erail-sub">
                  {etape.sous.map((s, i) => {
                    const sdone = mounted && isDone(sousId(es.slug, i));
                    const scur = !sdone && i === curSub;
                    return (
                      <li key={i} className={`${sdone ? "fait" : ""} ${scur ? "scur" : ""}`}>
                        <span className="erail-ring" aria-hidden>
                          {sdone ? "✓" : ""}
                        </span>
                        <span className="erail-st">{s.titre}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
