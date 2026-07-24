"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { SousEtape } from "@/lib/module-faire-un-site";
import {
  sousId,
  substepAnchor,
  useMarkModuleStarted,
  useModuleProgress,
} from "@/lib/progress";
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
  nextStep,
}: {
  sous: SousEtape[];
  detailPret: boolean;
  moduleKey: string;
  etapeSlug: string;
  etapeNum: string;
  nextStep?: { href: string; slug: string; num: string };
}) {
  const router = useRouter();
  const { isDone, setDone, mounted } = useModuleProgress(moduleKey);
  const [open, setOpen] = useState<number | null>(null); // tout fermé au départ
  useMarkModuleStarted(moduleKey);

  useEffect(() => {
    const openFromHash = () => {
      const prefix = `#sous-etape-${etapeSlug}-`;
      if (!window.location.hash.startsWith(prefix)) return;
      const index = Number(window.location.hash.slice(prefix.length)) - 1;
      if (index < 0 || index >= sous.length) return;
      setOpen(index);
      window.requestAnimationFrame(() => {
        document.getElementById(substepAnchor(etapeSlug, index))?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
          block: "start",
        });
      });
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [etapeSlug, sous.length]);

  // Sous-étape courante (première non faite) : sert de repère quand tout est replié.
  const currentIdx = mounted ? sous.findIndex((_, i) => !isDone(sousId(etapeSlug, i))) : -1;

  return (
    <>
      <p className="substeps-help">
        <span className="substeps-help-check" aria-hidden>
          ✓
        </span>
        Valide chaque sous-étape quand tu l&apos;as terminée. Ta progression sera sauvegardée et la
        suivante s&apos;ouvrira automatiquement.
      </p>
      <div className="se-list">
        {sous.map((s, i) => {
        const id = sousId(etapeSlug, i);
        const done = mounted && isDone(id);
        const isOpen = open === i;
        const label = `${etapeNum}.${i + 1}`;
        const isLast = i === sous.length - 1;
        // Le panneau de droite n'existe que s'il a quelque chose à apporter en
        // plus de la colonne principale : conseil, exemples, vécu. La durée et
        // « ce qu'on attend » sont déjà dans la colonne principale.
        const hasSideNotes = Boolean(
          (s.exemples && s.exemples.length > 0) || s.monExemple || s.conseil,
        );

        return (
          <div
            className={`se-item ${isOpen ? "open" : ""} ${open === null && i === currentIdx ? "active-collapsed" : ""}`}
            id={substepAnchor(etapeSlug, i)}
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
                <span className={done ? "" : "se-check-preview"}>✓</span>
              </button>
              <button className="se-head" onClick={() => setOpen(isOpen ? null : i)}>
                <span className="se-num">{label}</span>
                <span className="se-title">{s.titre}</span>
                <span className="se-tog" aria-hidden>
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </div>

            {isOpen && (
              <div className="se-panel">
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

                      {!done && (
                        <button
                          type="button"
                          className="btn se-done"
                          onClick={() => {
                            setDone(id, true);
                            if (!isLast) {
                              setOpen(i + 1);
                              window.requestAnimationFrame(() => {
                                document
                                  .getElementById(substepAnchor(etapeSlug, i + 1))
                                  ?.scrollIntoView({
                                    behavior: window.matchMedia(
                                      "(prefers-reduced-motion: reduce)",
                                    ).matches
                                      ? "auto"
                                      : "smooth",
                                    block: "center",
                                  });
                              });
                            } else if (nextStep) {
                              router.push(
                                `${nextStep.href}#${substepAnchor(nextStep.slug, 0)}`,
                              );
                            }
                          }}
                        >
                          {isLast
                            ? nextStep
                              ? `Valider et passer à l’étape ${nextStep.num} →`
                              : "Valider et terminer le module ✓"
                            : `Valider et passer à la ${etapeNum}.${i + 2} →`}
                        </button>
                      )}
                    </div>

                    {hasSideNotes && (
                      <aside className="se-aside" aria-label="Exemples et conseils">
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
    </>
  );
}
