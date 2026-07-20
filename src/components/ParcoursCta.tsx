"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { etapesDetail } from "@/lib/module-faire-un-site";
import { etapesDetailSkill } from "@/lib/module-creer-un-skill";
import { useModuleProgress, computeStats } from "@/lib/progress";

const PATH_EVT = "tve-path-choice";

function readChosenHref() {
  if (typeof window === "undefined") return "";
  try {
    const raw = localStorage.getItem("tve_quiz_reco");
    if (raw) {
      const reco = JSON.parse(raw);
      if (reco.branche === "construire" || reco.branche === "automatiser") return "/parcours";
    }

    const selected = localStorage.getItem("tve_selected_path");
    if (selected === "construire") return "/module";
    if (selected === "automatiser") return "/parcours";
    return "";
  } catch {
    return "";
  }
}

function subscribePathChoice(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener(PATH_EVT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(PATH_EVT, callback);
  };
}

// Bouton d'entrée du parcours, conscient de l'état :
// - rien de commencé  → « Choisis ton parcours » (vers le quiz)
// - parcours choisi   → « Continuer mon parcours » (vers la page parcours)
// - en cours          → « Reprends le parcours → » (vers ta dernière sous-étape)
// - terminé           → « Revois le parcours → »
export default function ParcoursCta({
  className = "btn",
  newLabel = "Choisis ton parcours",
  newHref = "/demarrer",
}: {
  className?: string;
  newLabel?: string;
  newHref?: string;
}) {
  const chosenHref = useSyncExternalStore(subscribePathChoice, readChosenHref, () => "");
  const buildProgress = useModuleProgress("/module");
  const skillProgress = useModuleProgress("/creer-un-skill");

  const buildLite = etapesDetail.map((e) => ({
    slug: e.slug,
    num: e.num,
    titre: e.titre,
    sousCount: e.sous.length,
  }));
  const skillLite = etapesDetailSkill.map((e) => ({
    slug: e.slug,
    num: e.num,
    titre: e.titre,
    sousCount: e.sous.length,
  }));
  const buildStats = computeStats(
    buildLite,
    buildProgress.mounted ? buildProgress.done : [],
    buildProgress.mounted && buildProgress.started,
  );
  const skillStats = computeStats(
    skillLite,
    skillProgress.mounted ? skillProgress.done : [],
    skillProgress.mounted && skillProgress.started,
  );
  const buildCurrent = buildStats.current;
  const skillCurrent = skillStats.current;

  let label = newLabel;
  let href = newHref;
  if (skillProgress.mounted && skillStats.started && skillCurrent) {
    label = "Reprendre où j'en étais →";
    href = `/creer-un-skill/${skillCurrent.etapeSlug}`;
  } else if (buildProgress.mounted && buildStats.started && buildCurrent) {
    label = "Reprendre où j'en étais →";
    href = `/module/${buildCurrent.etapeSlug}`;
  } else if (skillProgress.mounted && skillStats.allDone) {
    label = "Revoir le parcours →";
    href = "/creer-un-skill";
  } else if (buildProgress.mounted && buildStats.allDone) {
    label = "Continuer mon parcours →";
    href = "/creer-un-skill";
  } else if ((buildProgress.mounted || skillProgress.mounted) && chosenHref) {
    label = "Continuer mon parcours →";
    href = chosenHref;
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}
