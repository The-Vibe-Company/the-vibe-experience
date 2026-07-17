"use client";

import Link from "next/link";
import { etapesDetail } from "@/lib/module-faire-un-site";
import { useModuleProgress, computeStats } from "@/lib/progress";

// Carte compacte du module 01 pour la bibliothèque du parcours. Toute la carte
// est cliquable, comme les autres modules ; l'état (En cours / Terminé) et la
// barre de progression suffisent, pas de bouton dédié.
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

  const cur = mounted && stats.started && !stats.allDone;

  return (
    <Link
      href="/module"
      className={`pc-mc pc-mc-lead${cur ? " cur" : ""}`}
      onClick={onChooseModule}
    >
      <div className="pc-mc-head">
        <span className="label">Module 01 · Produit</span>
      </div>
      <span className="pc-mc-title">Faire un site</span>
      <p className="pc-mc-desc">
        De ton idée à en ligne : tu construis TON site en apprenant les vrais outils au passage.
      </p>
      <div className="pc-mc-prog">
        <div className="pc-prog-head">
          {mounted && stats.allDone ? (
            <span className="pc-status done">✓ Terminé</span>
          ) : cur ? (
            <span className="pc-status cur">
              <span className="pc-dot" aria-hidden />
              En cours
            </span>
          ) : (
            <span className="label">Progression</span>
          )}
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
    </Link>
  );
}
