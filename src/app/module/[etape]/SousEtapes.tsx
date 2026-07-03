"use client";

import { useState } from "react";
import type { SousEtape } from "@/lib/module-faire-un-site";

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
            <span className="soustitle">{s.titre}</span>
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
                  {s.cestquoi && (
                    <div className="detail-block">
                      <span className="dl">C&apos;est quoi</span>
                      <p>{s.cestquoi}</p>
                    </div>
                  )}
                  {s.attendu && (
                    <div className="detail-block">
                      <span className="dl">Ce qu&apos;on attend</span>
                      <p>{s.attendu}</p>
                    </div>
                  )}
                  {s.exemples && s.exemples.length > 0 && (
                    <div className="detail-block">
                      <span className="dl">Exemples</span>
                      <ul>
                        {s.exemples.map((e, j) => (
                          <li key={j}>{e}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {s.prompt && (
                    <div className="prompt">
                      <span className="plabel">Prompt fourni</span>
                      {s.prompt}
                    </div>
                  )}
                  {s.monExemple && (
                    <div className="mon-exemple">
                      <span className="dl">Mon exemple</span>
                      <p>{s.monExemple}</p>
                    </div>
                  )}
                  {s.conseil && (
                    <div className="detail-block">
                      <span className="dl">Conseil</span>
                      <p>{s.conseil}</p>
                    </div>
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
