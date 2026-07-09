"use client";

import { useEffect, useState } from "react";
import type { SousEtape } from "@/lib/module-faire-un-site";
import { useModuleProgress, sousId } from "@/lib/progress";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="se-copy"
      onClick={() => {
        navigator.clipboard?.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        });
      }}
    >
      {copied ? "Copié ✓" : "Copier"}
    </button>
  );
}

export default function SousEtapes({
  sous,
  detailPret,
  moduleKey,
  etapeSlug,
  etapeNum,
}: {
  sous: SousEtape[];
  detailPret: boolean;
  moduleKey: string;
  etapeSlug: string;
  etapeNum: string;
}) {
  const { isDone, setDone, mounted } = useModuleProgress(moduleKey);
  const [open, setOpen] = useState<number | null>(0);

  // Par défaut, on ouvre la première sous-étape non faite de cette étape.
  useEffect(() => {
    if (!mounted) return;
    const first = sous.findIndex((_, i) => !isDone(sousId(etapeSlug, i)));
    setOpen(first === -1 ? 0 : first);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  return (
    <div className="se-list">
      {sous.map((s, i) => {
        const id = sousId(etapeSlug, i);
        const done = mounted && isDone(id);
        const isOpen = open === i;
        const label = `${etapeNum}.${i + 1}`;
        const isLast = i === sous.length - 1;

        return (
          <div className={`se-item ${isOpen ? "open" : ""}`} key={i}>
            <div className="se-row">
              <button
                type="button"
                className={`se-check ${done ? "checked" : ""}`}
                aria-label={done ? "Décocher la sous-étape" : "Marquer la sous-étape comme faite"}
                aria-pressed={done}
                onClick={() => setDone(id, !done)}
              >
                {done ? "✓" : ""}
              </button>
              <button className="se-head" onClick={() => setOpen(isOpen ? null : i)}>
                <span className="se-num">{label}</span>
                <span className="se-title">
                  {s.titre}
                  {s.duree && <span className="se-dur">{s.duree}</span>}
                </span>
                <span className="se-tog" aria-hidden>
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </div>

            {isOpen && (
              <div className="se-panel">
                {!detailPret ? (
                  <p className="se-todo">
                    Le détail accompagné de cette sous-étape arrive bientôt.
                  </p>
                ) : (
                  <>
                    {s.cestquoi && (
                      <div className="se-block">
                        <span className="se-l">C&apos;est quoi</span>
                        <p>{s.cestquoi}</p>
                      </div>
                    )}
                    {s.attendu && (
                      <div className="se-block">
                        <span className="se-l">Ce qu&apos;on attend</span>
                        <p>{s.attendu}</p>
                      </div>
                    )}
                    {s.exemples && s.exemples.length > 0 && (
                      <div className="se-block">
                        <span className="se-l">Exemples</span>
                        <ul className="se-ex">
                          {s.exemples.map((e, j) => (
                            <li key={j}>
                              <span className="se-dash">–</span>
                              <span>{e}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {s.outils && s.outils.length > 0 && (
                      <div className="se-block">
                        <span className="se-l">Les outils</span>
                        <ul className="se-ex">
                          {s.outils.map((o) => (
                            <li key={o.n}>
                              <span className="se-dash">–</span>
                              <span>
                                <strong>{o.n}.</strong> {o.d}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {s.prompt && (
                      <div className="se-prompt">
                        <div className="se-prompt-head">
                          <span className="se-l">Prompt fourni</span>
                          <CopyButton text={s.prompt} />
                        </div>
                        <div className="se-prompt-body">{s.prompt}</div>
                      </div>
                    )}
                    {(s.ceQueTuDoisVoir || s.visuel) && (
                      <div className="se-block">
                        <span className="se-l">Ce que tu dois voir</span>
                        {s.ceQueTuDoisVoir && <p>{s.ceQueTuDoisVoir}</p>}
                        {s.visuel && (
                          <figure className="se-shot">
                            <div className="se-shot-bar" aria-hidden>
                              <span className="se-dot" />
                              <span className="se-dot" />
                              <span className="se-dot" />
                            </div>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={s.visuel.src} alt={s.visuel.alt} />
                            {s.visuel.legende && <figcaption>{s.visuel.legende}</figcaption>}
                          </figure>
                        )}
                      </div>
                    )}
                    {s.siCaBloque && (
                      <div className="se-block">
                        <span className="se-l">Si ça bloque</span>
                        <p>{s.siCaBloque}</p>
                      </div>
                    )}
                    {s.monExemple && (
                      <blockquote className="se-quote">
                        <p>{s.monExemple}</p>
                        <cite>— Victor</cite>
                      </blockquote>
                    )}
                    {s.conseil && (
                      <div className="se-block">
                        <span className="se-l">Conseil</span>
                        <p>{s.conseil}</p>
                      </div>
                    )}

                    {!done && (
                      <button
                        type="button"
                        className="btn se-done"
                        onClick={() => {
                          setDone(id, true);
                          if (!isLast) setOpen(i + 1);
                        }}
                      >
                        {isLast ? "Fait, étape terminée ✓" : `Fait, je passe à la ${etapeNum}.${i + 2} →`}
                      </button>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
