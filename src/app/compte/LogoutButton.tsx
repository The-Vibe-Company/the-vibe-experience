"use client";

import { createClient } from "@/lib/supabase/client";
import { clearLocalJourneyState } from "@/lib/journey-state";
import { stopSync } from "@/lib/progress";

export default function LogoutButton() {
  async function logout() {
    await createClient().auth.signOut();
    stopSync();
    clearLocalJourneyState();
    window.location.assign("/");
  }
  return (
    <button type="button" className="btn btn-ghost" onClick={logout}>
      Se déconnecter
    </button>
  );
}
