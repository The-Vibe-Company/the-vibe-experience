"use client";

import Link from "next/link";
import {
  computeStats,
  substepAnchor,
  useActiveModule,
  useModuleProgress,
  type EtapeLite,
} from "@/lib/progress";

export type ProgressCatalog = Record<string, EtapeLite[]>;

export default function ContinueLearningLink({ modules }: { modules: ProgressCatalog }) {
  const { moduleKey } = useActiveModule();
  const resolvedKey = Object.hasOwn(modules, moduleKey) ? moduleKey : null;
  const { done, mounted, started } = useModuleProgress(resolvedKey ?? "__aucun_module__");
  if (!resolvedKey || !mounted) return null;

  const etapes = modules[resolvedKey];
  const stats = computeStats(etapes, done, started);
  if (!stats.current || stats.allDone) return null;

  const current = stats.current;
  const href = `${resolvedKey}/${current.etapeSlug}#${substepAnchor(
    current.etapeSlug,
    current.subIndex,
  )}`;

  return (
    <Link href={href} className="nav-continue">
      Continuer
    </Link>
  );
}
