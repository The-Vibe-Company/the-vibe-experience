"use client";

import Link from "next/link";
import { etapesDetail } from "@/lib/module-faire-un-site";
import { useModuleProgress, computeStats } from "@/lib/progress";

export default function ParcoursModule1() {
  const { done, mounted } = useModuleProgress("/module");
  const lite = etapesDetail.map((e) => ({
    slug: e.slug,
    num: e.num,
    titre: e.titre,
    sousCount: e.sous.length,
  }));
  const stats = computeStats(lite, mounted ? done : []);
  const pct = stats.total ? Math.round((stats.doneCount / stats.total) * 100) : 0;
  const t = stats.current;

  const cur = mounted && stats.started && !stats.allDone;

  let cta = "Commencer le module";
  let href = "/module";
  if (mounted) {
    if (stats.allDone) cta = "Revoir le module";
    else if (cur && t) {
      cta = "Reprendre le module";
      href = `/module/${t.etapeSlug}`;
    }
  }

  return (
    <div className={`pc-mod${cur ? " cur" : ""}`}>
      <div className="pc-modhead">
        <span className="label">Module 01 · Produit</span>
        {mounted &&
          (stats.allDone ? (
            <span className="pc-status done">✓ Terminé</span>
          ) : cur ? (
            <span className="pc-status cur">
              <span className="pc-dot" aria-hidden />
              En cours · {stats.doneCount}/{stats.total}
            </span>
          ) : null)}
      </div>
      <div className="pc-grid">
        <div>
          <Link href="/module" className="pc-title">
            Faire un site
          </Link>
          <p className="pc-desc">
            De ton idée à en ligne : tu construis TON site en apprenant les vrais outils au passage.
          </p>
          <span className="pc-meta">Produit · 6 étapes · ≈ 4 à 5 h</span>
        </div>
        <div className="pc-right">
          <div className="pc-prog-head">
            <span className="label">Progression</span>
            {mounted && (
              <span className="pc-count">
                {stats.doneCount}/{stats.total}
              </span>
            )}
          </div>
          <div className="mprogress-bar" aria-hidden>
            <div className="mprogress-fill" style={{ width: `${pct}%` }} />
          </div>
          <Link href={href} className="btn btn-full pc-cta">
            {cta} →
          </Link>
        </div>
      </div>
    </div>
  );
}
