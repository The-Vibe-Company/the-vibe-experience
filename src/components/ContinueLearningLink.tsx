"use client";

import Link from "next/link";
import { etapesDetail } from "@/lib/module-faire-un-site";
import { etapesDetailSkill } from "@/lib/module-creer-un-skill";
import { etapesDetailAutomatisation } from "@/lib/module-automatisation";
import { etapesDetailDevis } from "@/lib/module-devis";
import { etapesDetailFacture } from "@/lib/module-facture";
import {
  computeStats,
  substepAnchor,
  useActiveModule,
  useModuleProgress,
} from "@/lib/progress";

const modules = {
  "/module": etapesDetail,
  "/creer-un-skill": etapesDetailSkill,
  "/automatiser-ton-travail": etapesDetailAutomatisation,
  "/automatiser-tes-devis": etapesDetailDevis,
  "/automatiser-tes-factures": etapesDetailFacture,
};

export default function ContinueLearningLink() {
  const { moduleKey } = useActiveModule();
  const resolvedKey = moduleKey in modules ? (moduleKey as keyof typeof modules) : null;
  const { done, mounted, started } = useModuleProgress(resolvedKey ?? "__aucun_module__");
  if (!resolvedKey || !mounted) return null;

  const etapes = modules[resolvedKey];
  const stats = computeStats(
    etapes.map(({ slug, num, titre, sous }) => ({
      slug,
      num,
      titre,
      sousCount: sous.length,
    })),
    done,
    started,
  );
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
