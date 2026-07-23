"use client";

import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  async function logout() {
    await createClient().auth.signOut();
    window.location.assign("/");
  }
  return (
    <button type="button" className="btn btn-ghost" onClick={logout}>
      Se déconnecter
    </button>
  );
}
