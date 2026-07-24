"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { hydrateFromServer, stopSync } from "@/lib/progress";
import { clearLocalJourneyState, syncJourneyState } from "@/lib/journey-state";
import {
  applyPendingJourneySnapshot,
  PENDING_JOURNEY_METADATA_KEY,
  readPendingJourneySnapshot,
} from "@/lib/pending-journey";

// Monté une fois dans le layout. Quand un compte est connecté (au chargement ou après un login),
// il réconcilie la progression locale avec celle du compte, puis laisse progress.ts pousser chaque
// changement. Ne rend rien : c'est juste le fil entre l'auth et la progression.
export default function ProgressSync() {
  useEffect(() => {
    const supabase = createClient();
    let syncQueue = Promise.resolve();

    const syncSession = (userId: string, userMetadata: Record<string, unknown>) => {
      syncQueue = syncQueue
        .then(async () => {
          const pending = readPendingJourneySnapshot(userMetadata);
          if (pending) applyPendingJourneySnapshot(pending);
          await hydrateFromServer(userId);
          await syncJourneyState(userId);
          if (pending) {
            const { error } = await supabase.auth.updateUser({
              data: { [PENDING_JOURNEY_METADATA_KEY]: null },
            });
            if (error) throw error;
          }
        })
        .catch(() => {
          // La copie locale et la métadonnée en attente restent disponibles pour le prochain essai.
        });
    };

    // onAuthStateChange émet aussi la session initiale au montage : ça couvre le chargement direct.
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        queueMicrotask(() =>
          syncSession(
            session.user.id,
            session.user.user_metadata as Record<string, unknown>,
          ),
        );
      } else if (event === "SIGNED_OUT") {
        stopSync();
        clearLocalJourneyState();
      }
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return null;
}
