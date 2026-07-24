"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import SkipQuizLink from "@/components/SkipQuizLink";
import { readActiveModule } from "@/lib/journey-state";

type Props = {
  hasProfile: boolean;
};

function readLocalPathHref() {
  if (typeof window === "undefined") return "";
  try {
    const activeModule = readActiveModule();
    if (activeModule) return activeModule;

    const selected = localStorage.getItem("tve_selected_path");
    if (selected === "construire") return "/module";
    if (selected === "automatiser") return "/parcours";

    const raw = localStorage.getItem("tve_quiz_reco");
    if (raw) {
      const reco = JSON.parse(raw);
      if (reco.moduleHref) return reco.moduleHref;
      if (reco.branche === "construire" || reco.branche === "automatiser") {
        return "/parcours";
      }
    }
    return "";
  } catch {
    return "";
  }
}

function subscribePathChoice(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("tve-path-choice", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("tve-path-choice", callback);
  };
}

export default function AccountPathActions({ hasProfile }: Props) {
  const localHref = useSyncExternalStore(subscribePathChoice, readLocalPathHref, () => "");
  const continueHref = localHref || (hasProfile ? "/parcours" : "");

  return (
    <>
      {continueHref ? (
        <Link href={continueHref} className="btn">
          Continuer mon parcours →
        </Link>
      ) : (
        <SkipQuizLink className="btn">
          Choisir mon parcours →
        </SkipQuizLink>
      )}
      <Link href="/demarrer" className="btn btn-ghost">
        Faire le quiz →
      </Link>
    </>
  );
}
