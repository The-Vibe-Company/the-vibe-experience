import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "./LogoutButton";
import ApplyPendingReco from "./ApplyPendingReco";

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
    <>
      <ApplyPendingReco hasProfile={!!profile?.niveau} />
      <header className="phead">
        <div className="wrap">
          <div className="label">Mon compte</div>
          <h1>Ton espace, <em>ta progression</em>.</h1>
          <p>
            Ici, on garde ton parcours et où tu en es. Bientôt : un onboarding qui construit ton
            parcours sur-mesure selon ce que tu veux créer.
          </p>
        </div>
      </header>

      <section className="block" style={{ paddingTop: "1.5rem" }}>
        <div className="wrap-narrow">
          <div className="compte-card">
            <div className="compte-row">
              <span>Email</span>
              <span className="v">{user.email}</span>
            </div>
            <div className="compte-row">
              <span>Niveau</span>
              <span className="v">{profile?.niveau ?? "à définir"}</span>
            </div>
            <div className="compte-row">
              <span>Objectif</span>
              <span className="v">{profile?.objectif ?? "à définir"}</span>
            </div>
          </div>

          <div className="compte-card">
            <div className="label">Ta progression</div>
            <p style={{ color: "var(--muted)", margin: ".8rem 0 1.2rem", fontSize: ".97rem" }}>
              Tu n&apos;as pas encore de parcours. L&apos;onboarding arrive pour le générer selon ton
              objectif.
            </p>
            <Link href="/parcours" className="btn">
              Voir le parcours
            </Link>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <LogoutButton />
          </div>
        </div>
      </section>
    </>
  );
}
