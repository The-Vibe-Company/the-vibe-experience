import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "./LogoutButton";
import ApplyPendingReco from "./ApplyPendingReco";
import CompteProgress from "@/components/CompteProgress";

export const metadata = { title: "Mon compte — The Vibe Experience" };

export default async function Compte() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/connexion");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("niveau, objectif")
    .eq("id", user.id)
    .single();

  return (
    <div className="nwrap">
      <ApplyPendingReco hasProfile={!!profile?.niveau} />
      <div className="label">Mon compte</div>
      <h1 className="pg-h1">
        Reprends <em>où tu t&apos;es arrêté</em>.
      </h1>

      <CompteProgress />

      <div className="acct-sec">
        <div className="label">Ton profil de départ</div>
        <div className="acct-card" style={{ marginTop: "1rem" }}>
          <div className="acct-row">
            <span className="acct-k">Niveau</span>
            <span className="acct-v">{profile?.niveau ?? "à définir"}</span>
          </div>
          <div className="acct-row">
            <span className="acct-k">Premier projet</span>
            <span className="acct-v">{profile?.objectif ?? "à définir"}</span>
          </div>
        </div>
      </div>

      <div className="acct-sec">
        <div className="label">Compte</div>
        <div className="acct-card" style={{ marginTop: "1rem" }}>
          <div className="acct-row">
            <span className="acct-k">E-mail</span>
            <span className="acct-v" style={{ fontWeight: 500, fontFamily: "var(--font-geist-mono), monospace", fontSize: ".88rem" }}>
              {user.email}
            </span>
          </div>
          <div className="acct-row">
            <span className="acct-k">Accès</span>
            <span className="acct-v" style={{ fontWeight: 400, color: "var(--muted)" }}>
              Gratuit et ouvert — tout le parcours est inclus.
            </span>
          </div>
        </div>
        <div style={{ marginTop: "1.2rem" }}>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
