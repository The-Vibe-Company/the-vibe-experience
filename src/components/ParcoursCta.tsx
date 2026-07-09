"use client";

import Link from "next/link";
import { etapesDetail } from "@/lib/module-faire-un-site";
import { useModuleProgress, computeStats } from "@/lib/progress";

// Bouton d'entrée du parcours, conscient de l'état :
// - rien de commencé  → « Commence le parcours » (vers newHref)
// - en cours          → « Reprends le parcours → » (vers ta dernière sous-étape)
// - terminé           → « Revois le parcours → »
export default function ParcoursCta({
  className = "btn",
  newLabel = "Commence le parcours",
  newHref = "/demarrer",
}: {
  className?: string;
  newLabel?: string;
  newHref?: string;
}) {
  const { done, mounted } = useModuleProgress("/module");
  const lite = etapesDetail.map((e) => ({
    slug: e.slug,
    num: e.num,
    titre: e.titre,
    sousCount: e.sous.length,
  }));
  const stats = computeStats(lite, mounted ? done : []);
  const t = stats.current;

  let label = newLabel;
  let href = newHref;
  if (mounted && stats.allDone) {
    label = "Revois le parcours →";
    href = "/module";
  } else if (mounted && stats.started && t) {
    label = "Reprends le parcours →";
    href = `/module/${t.etapeSlug}`;
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}
