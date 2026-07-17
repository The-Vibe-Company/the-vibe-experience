"use client";

import { useEffect, useRef, useState } from "react";

export default function SkillInstallCopyButton({
  href,
  name,
  className = "btn btn-ghost",
}: {
  href: string;
  name: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  return (
    <button
      type="button"
      className={className}
      aria-live="polite"
      onClick={() => {
        const url = new URL(href, window.location.origin).toString();
        const text = `Installe ce skill dans Claude Code : ${name}. Utilise cette URL : ${url}. Range-le dans mes skills personnels, puis confirme-moi quand il est disponible.`;
        navigator.clipboard
          ?.writeText(text)
          .then(() => {
            setCopied(true);
            if (timer.current) clearTimeout(timer.current);
            timer.current = setTimeout(() => setCopied(false), 1600);
          })
          .catch(() => {});
      }}
    >
      {copied ? "Copié ✓" : "Copier la consigne"}
    </button>
  );
}
