"use client";

import { useEffect } from "react";

type Props = {
  path: "construire" | "automatiser";
};

export default function MarkSelectedPath({ path }: Props) {
  useEffect(() => {
    try {
      localStorage.setItem("tve_selected_path", path);
      const raw = localStorage.getItem("tve_quiz_reco");
      if (raw) {
        const reco = JSON.parse(raw);
        delete reco.branche;
        localStorage.setItem("tve_quiz_reco", JSON.stringify(reco));
      }
      window.dispatchEvent(new CustomEvent("tve-path-choice"));
    } catch {}
  }, [path]);

  return null;
}
