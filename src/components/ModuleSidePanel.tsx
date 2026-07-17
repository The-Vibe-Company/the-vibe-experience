"use client";

import Link from "next/link";
import { computeStats, useModuleProgress, type EtapeLite } from "@/lib/progress";

type SideItem = {
  label: string;
  value: string;
};

type SideLink = {
  label: string;
  href: string;
};

export default function ModuleSidePanel({
  moduleKey,
  basePath,
  etapes,
  title,
  focus,
  facts,
  reminders,
  links,
}: {
  moduleKey: string;
  basePath: string;
  etapes: EtapeLite[];
  title: string;
  focus: string;
  facts: SideItem[];
  reminders: string[];
  links: SideLink[];
}) {
  const { done, mounted } = useModuleProgress(moduleKey);
  const stats = computeStats(etapes, mounted ? done : []);
  const pct = stats.total ? Math.round((stats.doneCount / stats.total) * 100) : 0;

  let cta = `Commencer à la sous-étape ${etapes[0]?.num}.1`;
  let href = `${basePath}/${etapes[0]?.slug}`;
  if (stats.allDone) {
    cta = "Revoir le module";
  } else if (stats.current) {
    cta = `${stats.started ? "Reprendre" : "Commencer"} à la sous-étape ${stats.current.etapeNum}.${stats.current.subIndex + 1}`;
    href = `${basePath}/${stats.current.etapeSlug}`;
  }

  return (
    <aside className="module-side" aria-label="Repères du module">
      <span className="label">Plan d&apos;attaque</span>
      <h2>{title}</h2>
      <p>{focus}</p>

      <Link className="module-side-next" href={href}>
        <span>Prochaine action</span>
        <strong>{cta} →</strong>
      </Link>

      <div className="module-side-progress" aria-label="Progression du module">
        <span>
          <strong>{stats.doneCount}/{stats.total}</strong>
          <em>sous-étapes</em>
        </span>
        <span>
          <strong>{pct}%</strong>
          <em>fait</em>
        </span>
      </div>

      <div className="module-side-list">
        {facts.map((fact) => (
          <div className="module-side-row" key={fact.label}>
            <span>{fact.label}</span>
            <strong>{fact.value}</strong>
          </div>
        ))}
      </div>

      <div className="module-side-reminders">
        <span className="se-l">À garder en tête</span>
        <ul>
          {reminders.map((reminder) => (
            <li key={reminder}>{reminder}</li>
          ))}
        </ul>
      </div>

      <div className="module-side-links">
        {links.map((link) => (
          <Link href={link.href} key={link.href}>
            {link.label} →
          </Link>
        ))}
      </div>
    </aside>
  );
}
