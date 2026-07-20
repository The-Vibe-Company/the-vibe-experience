"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

// Consigne d'installation d'un skill, pensée pour être collée telle quelle
// dans Claude Code ou Codex : l'agent télécharge l'archive et range le skill
// lui-même, l'utilisateur ne manipule jamais de fichier.
function buildPrompt(name: string, url: string) {
  return `Installe le skill « ${name} » : télécharge ${url}, décompresse l'archive, et range le dossier du skill dans mes skills personnels (~/.claude/skills pour Claude Code, ou l'équivalent de mon outil). Vérifie que son fichier SKILL.md est en place, puis confirme-moi que le skill est prêt.`;
}

export default function SkillInstallCopyButton({
  href,
  name,
  className = "btn btn-ghost",
  showHint = false,
  variant = "button",
}: {
  href: string;
  name: string;
  className?: string;
  showHint?: boolean;
  variant?: "button" | "box";
}) {
  const [copied, setCopied] = useState(false);
  // L'URL absolue n'existe qu'au chargement côté navigateur ; avant ça on
  // affiche le chemin relatif, remplacé dès le premier rendu client.
  const origin = useSyncExternalStore(
    () => () => {},
    () => window.location.origin,
    () => "",
  );
  const url = origin ? new URL(href, origin).toString() : href;
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const copy = () => {
    const text = buildPrompt(name, new URL(href, window.location.origin).toString());
    navigator.clipboard
      ?.writeText(text)
      .then(() => {
        setCopied(true);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), 1600);
      })
      .catch(() => {});
  };

  if (variant === "box") {
    return (
      <div className="se-prompt">
        <div className="se-prompt-head">
          <span className="se-l">Le prompt</span>
          <button type="button" className="btn btn-ghost se-dl-btn" aria-live="polite" onClick={copy}>
            {copied ? "Copié ✓" : "Copier le prompt"}
          </button>
        </div>
        <div className="se-prompt-body">{buildPrompt(name, url)}</div>
        <p className="se-prompt-note">
          À coller dans Claude Code ou Codex : il installe le skill tout seul.
        </p>
      </div>
    );
  }

  return (
    <span className="skill-copy">
      <button type="button" className={className} aria-live="polite" onClick={copy}>
        {copied ? "Copié ✓" : "Copier le prompt"}
      </button>
      {showHint && <span className="skill-copy-hint">À coller dans Claude Code ou Codex.</span>}
    </span>
  );
}
