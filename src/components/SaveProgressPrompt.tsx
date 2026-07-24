"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { sousId, substepAnchor, useModuleProgress } from "@/lib/progress";

const DISMISS_KEY = "tve-save-progress-dismissed";

export default function SaveProgressPrompt({
  moduleKey,
  currentHref,
  etapeSlug,
  substepCount,
  nextStep,
}: {
  moduleKey: string;
  currentHref: string;
  etapeSlug: string;
  substepCount: number;
  nextStep?: { href: string; slug: string };
}) {
  const { done, mounted } = useModuleProgress(moduleKey);
  const [anonymous, setAnonymous] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    queueMicrotask(() => {
      setDismissed(window.sessionStorage.getItem(DISMISS_KEY) === "1");
    });
    const supabase = createClient();
    void supabase.auth.getUser().then(({ data }) => setAnonymous(!data.user));
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setAnonymous(!session?.user);
    });
    return () => subscription.subscription.unsubscribe();
  }, []);

  const returnHref = useMemo(() => {
    const firstIncomplete = Array.from({ length: substepCount }, (_, index) => index).find(
      (index) => !done.includes(sousId(etapeSlug, index)),
    );
    if (firstIncomplete !== undefined) {
      return `${currentHref}#${substepAnchor(etapeSlug, firstIncomplete)}`;
    }
    if (nextStep) return `${nextStep.href}#${substepAnchor(nextStep.slug, 0)}`;
    return currentHref;
  }, [currentHref, done, etapeSlug, nextStep, substepCount]);

  if (!mounted || done.length === 0 || !anonymous || dismissed) return null;

  return (
    <aside className="save-progress-prompt" aria-label="Sauvegarder ta progression">
      <div>
        <strong>Progression enregistrée sur cet appareil</strong>
        <p>Crée ton compte pour la retrouver partout et éviter de la perdre.</p>
      </div>
      <div className="save-progress-actions">
        <Link
          className="btn btn-ghost"
          href={`/inscription?next=${encodeURIComponent(returnHref)}`}
        >
          Sauvegarder ma progression
        </Link>
        <button
          type="button"
          className="quiz-choose"
          onClick={() => {
            window.sessionStorage.setItem(DISMISS_KEY, "1");
            setDismissed(true);
          }}
        >
          Plus tard
        </button>
      </div>
    </aside>
  );
}
