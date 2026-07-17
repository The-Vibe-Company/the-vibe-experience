"use client";

import Link from "next/link";
import { etapesDetail } from "@/lib/module-faire-un-site";
import { useModuleProgress, computeStats } from "@/lib/progress";

// Carte compacte du module 01 pour la colonne « Apprendre à construire » du parcours.
export default function ParcoursModule1({ onChooseModule }: { onChooseModule?: () => void }) {
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
    <div className={`pc-mc pc-mc-lead${cur ? " cur" : ""}`}>
      <div className="pc-mc-head">
        <span className="label">Module 01 · Produit</span>
        <span className="pc-mc-head-side">
          <span className="pc-mc-time">≈ 3 à 4 h</span>
          {mounted &&
            (stats.allDone ? (
              <span className="pc-status done">✓ Terminé</span>
            ) : cur ? (
              <span className="pc-status cur">
                <span className="pc-dot" aria-hidden />
                En cours · {stats.doneCount}/{stats.total}
              </span>
            ) : null)}
        </span>
      </div>
      <Link href="/module" className="pc-mc-title" onClick={onChooseModule}>
        Faire un site
      </Link>
      <p className="pc-mc-desc">
        De ton idée à en ligne : tu construis TON site en apprenant les vrais outils au passage.
      </p>
      <div className="pc-mc-prog">
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
      </div>
      <Link href={href} className="btn btn-full pc-mc-cta" onClick={onChooseModule}>
        {cta} →
      </Link>
    </div>
  );
}
