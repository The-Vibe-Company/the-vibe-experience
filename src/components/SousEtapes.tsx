"use client";

import { useEffect, useState } from "react";
import type { SousEtape } from "@/lib/module-faire-un-site";
import { useModuleProgress, sousId } from "@/lib/progress";
import CopyButton from "@/components/CopyButton";
import SkillInstallCopyButton from "@/components/SkillInstallCopyButton";

const sentenceSegmenter = new Intl.Segmenter("fr", { granularity: "sentence" });

function splitParagraphs(text: string) {
  const explicit = text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (explicit.length > 1 || text.length < 320) return explicit.length ? explicit : [text];

  const sentences = text.split(/(?<=[.!?])\s+/).filter(Boolean);
  const paragraphs: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    const next = current ? `${current} ${sentence}` : sentence;
    if (current && next.length > 280) {
      paragraphs.push(current);
      current = sentence;
    } else {
      current = next;
    }
  }
  if (current) paragraphs.push(current);

  return paragraphs;
}

function TextParagraphs({ text }: { text: string }) {
  return (
    <div className="se-rich">
      {splitParagraphs(text).map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </div>
  );
}

function GuidanceParagraphs({ text }: { text: string }) {
  const paragraphs = Array.from(sentenceSegmenter.segment(text), ({ segment }) => segment.trim()).filter(Boolean);

  return (
    <div className="se-rich">
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
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
  const [open, setOpen] = useState<number | null>(null); // tout fermé au départ
  const prerequisitesIndex = sous.findIndex((s) => s.prerequis && s.prerequis.length > 0);

  useEffect(() => {
    const revealPrerequisites = () => {
      if (window.location.hash === "#prerequis" && prerequisitesIndex >= 0) {
        setOpen(prerequisitesIndex);
      }
    };

    revealPrerequisites();
    window.addEventListener("hashchange", revealPrerequisites);
    return () => window.removeEventListener("hashchange", revealPrerequisites);
  }, [prerequisitesIndex]);

  // Sous-étape courante (première non faite) : sert de repère quand tout est replié.
  const currentIdx = mounted ? sous.findIndex((_, i) => !isDone(sousId(etapeSlug, i))) : -1;

  return (
    <div className="se-list">
      {sous.map((s, i) => {
        const id = sousId(etapeSlug, i);
        const done = mounted && isDone(id);
        const isOpen = open === i;
        const label = `${etapeNum}.${i + 1}`;
        const panelId = `sous-etape-${etapeSlug}-${i}`;
        const isLast = i === sous.length - 1;
        // Le panneau de droite regroupe les informations d'accompagnement :
        // préparation, conseil, exemples et vécu. La durée et « ce qu'on
        // attend » restent dans le flux principal.
        const hasSideNotes = Boolean(
          (s.prerequis && s.prerequis.length > 0) ||
            (s.exemples && s.exemples.length > 0) ||
            s.monExemple ||
            s.conseil,
        );

        return (
          <div
            id={i === prerequisitesIndex ? "prerequis" : undefined}
            className={`se-item ${isOpen ? "open" : ""} ${open === null && i === currentIdx ? "active-collapsed" : ""}`}
            key={i}
          >
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
              <button
                type="button"
                className="se-head"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="se-num">{label}</span>
                <span className="se-title">{s.titre}</span>
                <span className="se-tog" aria-hidden>
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </div>

            {isOpen && (
              <div className="se-panel" id={panelId}>
                {s.duree && <div className="se-pdur">{s.duree}</div>}
                {!detailPret ? (
                  <p className="se-todo">
                    Le détail accompagné de cette sous-étape arrive bientôt.
                  </p>
                ) : (
                  <div className={`se-panel-layout ${hasSideNotes ? "has-side" : ""}`}>
                    <div className="se-main">
                      {s.cestquoi && (
                        <div className="se-block">
                          <span className="se-l">C&apos;est quoi</span>
                          <TextParagraphs text={s.cestquoi} />
                        </div>
                      )}
                      {s.attendu && (
                        <div className="se-block">
                          <span className="se-l">Ce qu&apos;on attend</span>
                          <TextParagraphs text={s.attendu} />
                        </div>
                      )}
                      {s.telechargements && s.telechargements.length > 0 && (
                        <div className="se-block">
                          <div className="se-install-list">
                            {s.telechargements.map((t) => (
                              <div className="se-install" key={t.href}>
                                <span className="se-l">Installer le skill : {t.n}</span>
                                <div className="se-dl">
                                  <SkillInstallCopyButton
                                    href={t.href}
                                    name={t.n}
                                    className="btn btn-ghost se-dl-btn"
                                    showHint
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {s.lien && (
                        <div className="se-block">
                          <span className="se-l">Où ça se passe</span>
                          <div className="se-dl">
                            <a
                              className="btn btn-ghost se-dl-btn"
                              href={s.lien.href}
                              {...(s.lien.href.startsWith("http")
                                ? { target: "_blank", rel: "noreferrer" }
                                : {})}
                            >
                              {s.lien.label} {s.lien.href.startsWith("http") ? "↗" : "→"}
                            </a>
                          </div>
                        </div>
                      )}
                      {s.pasAPas && s.pasAPas.length > 0 && (
                        <div className="se-block">
                          <span className="se-l">Comment faire</span>
                          <ol className="se-steps">
                            {s.pasAPas.map((p, j) => (
                              <li key={j}>
                                <span>{p}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}
                      {s.outils && s.outils.length > 0 && (
                        <div className="se-block">
                          <span className="se-l">Les outils</span>
                          <ul className="se-ex">
                            {s.outils.map((o) => (
                              <li key={o.n}>
                                <span className="se-dash">-</span>
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
                          {s.prompt.includes("[") && (
                            <p className="se-prompt-note">
                              Remplace ce qui est entre crochets [ ] par tes propres mots avant
                              d&apos;envoyer.
                            </p>
                          )}
                        </div>
                      )}
                      {(s.ceQueTuDoisVoir || s.visuel) && (
                        <div className="se-block se-guidance">
                          <span className="se-l">Ce que tu dois voir</span>
                          {s.ceQueTuDoisVoir && <GuidanceParagraphs text={s.ceQueTuDoisVoir} />}
                          {s.visuel && (
                            <figure className="se-shot">
                              <div className="se-shot-bar" aria-hidden>
                                <span className="se-dot" />
                                <span className="se-dot" />
                                <span className="se-dot" />
                              </div>
                              {/* width et height réservent la place avant le chargement :
                                  sans elles, le texte saute quand l'image arrive. */}
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={s.visuel.src}
                                alt={s.visuel.alt}
                                width={s.visuel.w}
                                height={s.visuel.h}
                              />
                              {s.visuel.legende && <figcaption>{s.visuel.legende}</figcaption>}
                            </figure>
                          )}
                        </div>
                      )}
                      {s.siCaBloque && (
                        <div className="se-block se-guidance">
                          <span className="se-l">Si ça bloque</span>
                          <GuidanceParagraphs text={s.siCaBloque} />
                        </div>
                      )}
                      {s.encart && (
                        <div className="se-block se-encart">
                          <span className="se-l">{s.encart.titre}</span>
                          <TextParagraphs text={s.encart.texte} />
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
                    </div>

                    {hasSideNotes && (
                      <aside
                        className="se-aside"
                        aria-label="Préparation, exemples et conseils"
                      >
                        {s.prerequis && s.prerequis.length > 0 && (
                          <div className="se-block">
                            <span className="se-l">Ce qu&apos;il te faut sous la main</span>
                            <ul className="se-ex">
                              {s.prerequis.map((p) => (
                                <li key={p.quoi}>
                                  <span className="se-dash">-</span>
                                  <span>{p.quoi}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {s.conseil && (
                          <div className="se-block">
                            <span className="se-l">Conseil</span>
                            <TextParagraphs text={s.conseil} />
                          </div>
                        )}
                        {s.exemples && s.exemples.length > 0 && (
                          <div className="se-block">
                            <span className="se-l">Exemples</span>
                            <ul className="se-ex">
                              {s.exemples.map((e, j) => (
                                <li key={j}>
                                  <span className="se-dash">-</span>
                                  <span>{e}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {s.monExemple && (
                          <blockquote className="se-quote">
                            <span className="se-l">Victor</span>
                            {splitParagraphs(s.monExemple).map((paragraph, j) => (
                              <p key={j}>{paragraph}</p>
                            ))}
                          </blockquote>
                        )}
                      </aside>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
