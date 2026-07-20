"use client";

import Link from "next/link";
import { etapesDetail } from "@/lib/module-faire-un-site";
import { useModuleProgress, computeStats } from "@/lib/progress";

export default function CompteProgress() {
  const { done, mounted, started } = useModuleProgress("/module");
  const lite = etapesDetail.map((e) => ({ slug: e.slug, num: e.num, titre: e.titre, sousCount: e.sous.length }));
  const stats = computeStats(lite, mounted ? done : [], mounted && started);
  const pct = stats.total ? Math.round((stats.doneCount / stats.total) * 100) : 0;
  const t = stats.current;

  let cta = "Commencer le module";
  let href = "/module";
  if (mounted) {
    if (stats.allDone) cta = "Revoir le module";
    else if (t) {
      cta = `${stats.started ? "Reprendre" : "Commencer"} à la sous-étape ${t.etapeNum}.${t.subIndex + 1}`;
      href = `/module/${t.etapeSlug}`;
    }
  }

  return (
    <div className="acct-card">
      <div className="acct-caphead">
        <span className="label">Module 01 · Produit</span>
        {mounted && (
          <span className="cost">
            {stats.doneCount}/{stats.total} sous-étapes
          </span>
        )}
      </div>
      <div className="acct-mtitle">Faire un site</div>
      <div className="mprogress-bar" aria-hidden>
        <div className="mprogress-fill" style={{ width: `${pct}%` }} />
      </div>
      <Link className="btn" href={href} style={{ marginTop: "1.2rem", display: "inline-flex" }}>
        {cta} →
      </Link>
    </div>
  );
}
