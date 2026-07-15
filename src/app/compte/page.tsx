import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "./LogoutButton";
import ApplyPendingReco from "./ApplyPendingReco";
import ChangePassword from "./ChangePassword";
import SkipQuizLink from "@/components/SkipQuizLink";

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
      <h1 className="pg-h1">Ton compte.</h1>
      <p className="pg-lead">
        Tes infos, ton profil, ta connexion. Le quiz est optionnel : tu peux choisir ton parcours
        directement ou le faire pour être orienté.
      </p>

      <div className="acct-sec">
        <div className="label">Compte</div>
        <div className="acct-card">
          <div className="acct-row">
            <span className="acct-k">E-mail</span>
            <span
              className="acct-v"
              style={{
                fontWeight: 500,
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: ".88rem",
              }}
            >
              {user.email}
            </span>
          </div>
          <ChangePassword />
          <div className="acct-row">
            <span className="acct-k">Accès</span>
            <span className="acct-v" style={{ fontWeight: 400, color: "var(--muted)" }}>
              Gratuit et ouvert, tout le parcours est inclus.
            </span>
          </div>
        </div>
        <div style={{ marginTop: "1.2rem" }}>
          <LogoutButton />
        </div>
      </div>

      <div className="acct-sec">
        <div className="label">Ton profil de départ</div>
        <div className="acct-card">
          <div className="acct-row">
            <span className="acct-k">Niveau</span>
            <span className="acct-v">{profile?.niveau ?? "à définir"}</span>
          </div>
          <div className="acct-row">
            <span className="acct-k">Premier projet</span>
            <span className="acct-v">{profile?.objectif ?? "à définir"}</span>
          </div>
          <div className="acct-row">
            <span className="acct-k">Le test</span>
            <span className="acct-v" style={{ fontWeight: 400 }}>
              <Link href="/demarrer" style={{ color: "var(--orange-ink)", fontWeight: 600 }}>
                {profile?.niveau ? "Refaire le quiz →" : "Faire le quiz →"}
              </Link>
            </span>
          </div>
        </div>
      </div>

      <div className="acct-sec">
        <div className="label">Ton parcours</div>
        <div className="acct-card acct-choice">
          <div>
            <div className="acct-mtitle">Tu peux commencer sans attendre.</div>
            <p>
              Choisis une famille de modules maintenant. Si tu hésites, le quiz reste disponible
              quand tu veux.
            </p>
          </div>
          <div className="acct-choice-actions">
            <SkipQuizLink className="btn">
              Choisir mon parcours →
            </SkipQuizLink>
            <Link href="/demarrer" className="btn btn-ghost">
              Faire le quiz →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
