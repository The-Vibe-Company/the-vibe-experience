"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import type { SousEtape } from "@/lib/module-faire-un-site";

// Détail dépliable, discret : un lien avec un chevron, le contenu se révèle en dessous.
// Pas de boîte : moins de charge visuelle, ça se lit comme un guide.
function Toggle({ label, children }: { label: string; children: ReactNode }) {
  return (
    <details className="toggle">
      <summary>{label}</summary>
      <div className="toggle-body">{children}</div>
    </details>
  );
}

export default function SousEtapes({
  sous,
  detailPret,
}: {
  sous: SousEtape[];
  detailPret: boolean;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="souslist">
      {sous.map((s, i) => (
        <div className={`sousitem ${open === i ? "open" : ""}`} key={i}>
          <button className="soushead" onClick={() => setOpen(open === i ? null : i)}>
            <span className="sousnum">{i + 1}</span>
            <span className="soustitle">
              {s.titre}
              {s.duree && <span className="sousduree">{s.duree}</span>}
            </span>
            <span className="souschev" aria-hidden>
              ›
            </span>
          </button>

          {open === i && (
            <div className="sousbody">
              {!detailPret ? (
                <p className="detail-todo">
                  Le détail accompagné de cette sous-étape (c&apos;est quoi, ce qu&apos;on attend,
                  des exemples et mon exemple) arrive bientôt. L&apos;étape 1 montre déjà le niveau
                  de détail visé.
                </p>
              ) : (
                <>
                  {/* Contenu principal, en clair */}
                  {s.cestquoi && (
                    <div className="dsec dsec-lead">
                      <p>{s.cestquoi}</p>
                    </div>
                  )}
                  {s.attendu && (
                    <div className="dsec">
                      <span className="dsec-l">Ce qu&apos;on attend</span>
                      <p>{s.attendu}</p>
                    </div>
                  )}

                  {/* Détails, en dépliables discrets */}
                  {s.prompt && (
                    <Toggle label="Prompt fourni">
                      <div className="prompt">{s.prompt}</div>
                    </Toggle>
                  )}
                  {(s.ceQueTuDoisVoir || s.visuel) && (
                    <Toggle label="Ce que tu dois voir">
                      {s.ceQueTuDoisVoir && <p>{s.ceQueTuDoisVoir}</p>}
                      {s.visuel && (
                        <figure className="visuel">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={s.visuel.src} alt={s.visuel.alt} />
                          {s.visuel.legende && <figcaption>{s.visuel.legende}</figcaption>}
                        </figure>
                      )}
                    </Toggle>
                  )}
                  {s.exemples && s.exemples.length > 0 && (
                    <Toggle label="Exemples">
                      <ul>
                        {s.exemples.map((e, j) => (
                          <li key={j}>{e}</li>
                        ))}
                      </ul>
                    </Toggle>
                  )}
                  {s.outils && s.outils.length > 0 && (
                    <Toggle label="Les outils">
                      <div className="fiches">
                        {s.outils.map((o) => (
                          <div className="fiche" key={o.n}>
                            <span className="fn">{o.n}</span>
                            <span className="fd">{o.d}</span>
                          </div>
                        ))}
                      </div>
                    </Toggle>
                  )}
                  {s.siCaBloque && (
                    <Toggle label="Si ça bloque">
                      <p>{s.siCaBloque}</p>
                    </Toggle>
                  )}
                  {s.monExemple && (
                    <Toggle label="Mon exemple">
                      <p>{s.monExemple}</p>
                    </Toggle>
                  )}
                  {s.conseil && (
                    <Toggle label="Conseil">
                      <p>{s.conseil}</p>
                    </Toggle>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
