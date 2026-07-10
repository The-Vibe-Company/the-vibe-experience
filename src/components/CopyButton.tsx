"use client";

import { useEffect, useRef, useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  return (
    <button
      type="button"
      className="se-copy"
      aria-live="polite"
      onClick={() => {
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
      {copied ? "Copié ✓" : "Copier"}
    </button>
  );
}
