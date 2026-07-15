"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { hydrateFromServer, stopSync } from "@/lib/progress";

// Monté une fois dans le layout. Quand un compte est connecté (au chargement ou après un login),
// il réconcilie la progression locale avec celle du compte, puis laisse progress.ts pousser chaque
// changement. Ne rend rien : c'est juste le fil entre l'auth et la progression.
export default function ProgressSync() {
  useEffect(() => {
    const supabase = createClient();
    // onAuthStateChange émet aussi la session initiale au montage : ça couvre le chargement direct.
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) void hydrateFromServer(session.user.id);
      else if (event === "SIGNED_OUT") stopSync();
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return null;
}
