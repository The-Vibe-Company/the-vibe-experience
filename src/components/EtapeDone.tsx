"use client";

import Link from "next/link";
import { useModuleProgress } from "@/lib/progress";

export default function EtapeDone({
  moduleKey,
  slug,
  nextHref,
  nextLabel,
}: {
  moduleKey: string;
  slug: string;
  nextHref?: string;
  nextLabel?: string;
}) {
  const { isDone, setDone, mounted } = useModuleProgress(moduleKey);
  const fait = mounted && isDone(slug);

  return (
    <div className={`etape-done ${fait ? "is-done" : ""}`}>
      {!fait ? (
        <>
          <p>Tu as terminé cette étape ?</p>
          <button type="button" className="btn" onClick={() => setDone(slug, true)}>
            Marquer comme faite
          </button>
        </>
      ) : (
        <>
          <p>
            <span className="etape-done-check" aria-hidden>
              ✓
            </span>
            Étape faite. {nextHref ? "La suivante t'attend." : "Bravo, tu as fini le module."}
          </p>
          <div className="etape-done-actions">
            {nextHref && (
              <Link className="btn" href={nextHref}>
                {nextLabel} →
              </Link>
            )}
            <button type="button" className="btn btn-ghost" onClick={() => setDone(slug, false)}>
              Annuler
            </button>
          </div>
        </>
      )}
    </div>
  );
}
