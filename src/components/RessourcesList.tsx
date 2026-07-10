"use client";

import Link from "next/link";
import { useState } from "react";
import { costLabel, ressources } from "@/lib/ressources";

const filters = [
  { key: "all", label: "Tout" },
  { key: "outils", label: "Outils" },
  { key: "skills", label: "Skills" },
  { key: "prompts", label: "Prompts" },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="se-copy"
      onClick={() => {
        navigator.clipboard
          ?.writeText(text)
          .then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
          })
          .catch(() => {});
      }}
    >
      {copied ? "Copié ✓" : "Copier"}
    </button>
  );
}

export default function RessourcesList() {
  const [active, setActive] = useState("all");

  return (
    <>
      <div className="rfilters">
        {filters.map((f) => (
          <button
            key={f.key}
            className={`rfilter ${active === f.key ? "active" : ""}`}
            onClick={() => setActive(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="rfil">
        {ressources
          .filter((r) => active === "all" || r.cat === active)
          .map((r) => (
            <div className="rrow" key={r.title}>
              <div className="rrow-body">
                <div className="rrow-type">
                  {r.type}
                  {r.cost && <span className={`cost cost-${r.cost}`}>{costLabel[r.cost]}</span>}
                </div>
                <div className="rrow-title">{r.title}</div>
                <div className="rrow-text">{r.text}</div>
                {r.prompt && (
                  <div className="se-prompt rrow-prompt">
                    <div className="se-prompt-head">
                      <span className="se-l">Le prompt</span>
                      <CopyButton text={r.prompt} />
                    </div>
                    <div className="se-prompt-body">{r.prompt}</div>
                  </div>
                )}
              </div>
              {r.action.kind === "parcours" && (
                <Link href={r.action.href} className="rrow-action">
                  Voir dans le parcours →
                </Link>
              )}
              {r.action.kind === "telecharger" && (
                <a href={r.action.href} className="rrow-action" download>
                  Télécharger
                </a>
              )}
            </div>
          ))}
      </div>
    </>
  );
}
