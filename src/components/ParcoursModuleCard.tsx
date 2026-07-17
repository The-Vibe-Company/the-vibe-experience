"use client";

import Link from "next/link";
import type { EtapeDetail } from "@/lib/module-faire-un-site";
import { computeStats, useModuleProgress } from "@/lib/progress";

export default function ParcoursModuleCard({
  moduleKey,
  href,
  etapes,
  label,
  title,
  description,
  meta,
  idleStatus,
  lead = false,
  onChooseModule,
}: {
  moduleKey: string;
  href: string;
  etapes: EtapeDetail[];
  label: string;
  title: string;
  description: string;
  meta?: string;
  idleStatus?: string;
  lead?: boolean;
  onChooseModule?: () => void;
}) {
  const { done, mounted, started } = useModuleProgress(moduleKey);
  const lite = etapes.map((e) => ({
    slug: e.slug,
    num: e.num,
    titre: e.titre,
    sousCount: e.sous.length,
  }));
  const stats = computeStats(lite, mounted ? done : [], mounted && started);
  const pct = stats.total ? Math.round((stats.doneCount / stats.total) * 100) : 0;
  const cur = mounted && stats.started && !stats.allDone;

  return (
    <Link
      href={href}
      className={`pc-mc${lead ? " pc-mc-lead" : ""}${cur ? " cur" : ""}`}
      onClick={onChooseModule}
    >
      <div className="pc-mc-head">
        <span className="label">{label}</span>
        {mounted && stats.allDone ? (
          <span className="pc-status done">✓ Terminé</span>
        ) : cur ? (
          <span className="pc-status cur">
            <span className="pc-dot" aria-hidden />
            En cours
          </span>
        ) : idleStatus ? (
          <span className="pc-mc-status">{idleStatus} →</span>
        ) : null}
      </div>
      <span className="pc-mc-title">{title}</span>
      <p className="pc-mc-desc">{description}</p>
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
      {meta && <span className="pc-mc-meta">{meta}</span>}
    </Link>
  );
}
