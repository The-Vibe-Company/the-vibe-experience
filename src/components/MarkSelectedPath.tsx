"use client";

import { useEffect } from "react";

type Props = {
  path: "construire" | "automatiser";
};

export default function MarkSelectedPath({ path }: Props) {
  useEffect(() => {
    try {
      localStorage.setItem("tve_selected_path", path);
      window.dispatchEvent(new CustomEvent("tve-path-choice"));
    } catch {}
  }, [path]);

  return null;
}
