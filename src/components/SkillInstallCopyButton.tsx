"use client";

import { useEffect, useRef, useState } from "react";

// Copie le skill lui-même : le texte copié contient l'instruction
// d'installation puis le contenu intégral de chaque fichier du skill
// (généré dans public/skills/<slug>-install.txt). L'utilisateur le colle
// dans Claude Code ou Codex et l'agent recrée les fichiers en local,
// sans télécharger quoi que ce soit.
export default function SkillInstallCopyButton({
  href,
  name,
  className = "btn btn-ghost",
  showHint = false,
}: {
  href: string;
  name: string;
  className?: string;
  showHint?: boolean;
}) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const installUrl = href.replace(/\.zip$/, "-install.txt");

  const flash = (s: "copied" | "error") => {
    setState(s);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 1800);
  };

  const copy = async () => {
    try {
      // ClipboardItem avec promesse : garde le geste utilisateur valide
      // pendant le chargement du texte (Safari y tient).
      if (typeof ClipboardItem !== "undefined" && navigator.clipboard?.write) {
        const blob = fetch(installUrl).then((r) => {
          if (!r.ok) throw new Error(String(r.status));
          return r.blob();
        });
        await navigator.clipboard.write([new ClipboardItem({ "text/plain": blob })]);
      } else {
        const r = await fetch(installUrl);
        if (!r.ok) throw new Error(String(r.status));
        await navigator.clipboard.writeText(await r.text());
      }
      flash("copied");
    } catch {
      flash("error");
    }
  };

  return (
    <span className="skill-copy">
      <button type="button" className={className} aria-live="polite" onClick={copy}>
        {state === "copied" ? "Copié ✓" : state === "error" ? "Réessayer" : `Copier le skill`}
      </button>
      {showHint && (
        <span className="skill-copy-hint">
          {`À coller dans Claude Code ou Codex : ${name} s'installe tout seul.`}
        </span>
      )}
    </span>
  );
}
