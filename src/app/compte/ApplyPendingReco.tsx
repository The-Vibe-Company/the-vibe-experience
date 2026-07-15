"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

// Applique une reco de quiz faite en anonyme, une fois la personne connectée.
export default function ApplyPendingReco({ hasProfile }: { hasProfile: boolean }) {
  const router = useRouter();

  useEffect(() => {
    if (hasProfile) return;
    const raw = localStorage.getItem("tve_quiz_reco");
    if (!raw) return;
    (async () => {
      try {
        const record = JSON.parse(raw) as {
          niveau?: string;
          objectif?: string;
          branche?: "construire" | "automatiser";
        };
        if (!record?.niveau) return;
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;
        const { error } = await supabase
          .from("profiles")
          .update({ niveau: record.niveau, objectif: record.objectif })
          .eq("id", user.id);
        if (!error) {
          if (record.branche === "construire" || record.branche === "automatiser") {
            localStorage.setItem("tve_selected_path", record.branche);
            window.dispatchEvent(new CustomEvent("tve-path-choice"));
          }
          localStorage.removeItem("tve_quiz_reco");
          router.refresh();
        }
      } catch {
        // silencieux : la reprise est un bonus, pas un bloquant
      }
    })();
  }, [hasProfile, router]);

  return null;
}
