"use client";

import Link from "next/link";
import { useModuleProgress } from "@/lib/progress";

type E = { slug: string; num: string };

// En-tête de progression sur la page d'un module : combien d'étapes faites, et un bouton
// pour reprendre directement là où on s'est arrêté. Le site retient la place à l'utilisateur.
export default function ModuleProgress({
  moduleKey,
  basePath,
  etapes,
}: {
  moduleKey: string;
  basePath: string;
  etapes: E[];
}) {
  const { isDone, mounted } = useModuleProgress(moduleKey);
  if (!mounted) return null;

  const total = etapes.length;
  const doneCount = etapes.filter((e) => isDone(e.slug)).length;
  const firstNotDone = etapes.find((e) => !isDone(e.slug));
  const target = firstNotDone ?? etapes[0];
  const pct = Math.round((doneCount / total) * 100);
  const allDone = doneCount === total;
  const started = doneCount > 0;

  const cta = allDone
    ? "Revoir le module"
    : started
      ? `Reprendre à l'étape ${target.num}`
      : `Commencer à l'étape ${target.num}`;

  return (
    <div className="mprogress">
      <div className="mprogress-top">
        <span className="mprogress-count">
          {doneCount} / {total} étapes faites
        </span>
        <Link className="btn" href={`${basePath}/${target.slug}`}>
          {cta} →
        </Link>
      </div>
      <div className="mprogress-bar" aria-hidden>
        <div className="mprogress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
