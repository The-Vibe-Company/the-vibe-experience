"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import SkipQuizLink from "@/components/SkipQuizLink";
import {
  createPendingJourneySnapshot,
  PENDING_JOURNEY_METADATA_KEY,
} from "@/lib/pending-journey";

export default function InscriptionForm({ nextPath }: { nextPath: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const confirmUrl = `${window.location.origin}/auth/confirm?next=${encodeURIComponent(nextPath)}`;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: confirmUrl,
        data: {
          [PENDING_JOURNEY_METADATA_KEY]: createPendingJourneySnapshot(),
        },
      },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    if (data.session) {
      window.location.assign(nextPath);
    } else {
      setDone(true);
    }
  }

  const loginHref = `/connexion?next=${encodeURIComponent(nextPath)}`;

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="label">Crée ton compte</div>
        <h1 style={{ marginTop: ".8rem" }}>Sauvegarde ton parcours.</h1>
        <p className="sub">
          Retrouve ton résultat et ta progression sur n&apos;importe quel appareil.
        </p>

        {done ? (
          <>
            <div className="auth-msg ok">
              Vérifie ta boîte mail et clique sur le lien reçu. Tu arriveras ensuite directement à
              ton point de départ.
            </div>
            <div className="auth-next">
              <Link href={nextPath} className="quiz-choose">
                Continuer sans attendre →
              </Link>
            </div>
          </>
        ) : (
          <form onSubmit={onSubmit}>
            {error && <div className="auth-msg err">{error}</div>}
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="toi@exemple.com"
              />
            </div>
            <div className="field">
              <label htmlFor="password">Mot de passe</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="6 caractères minimum"
              />
            </div>
            <button type="submit" className="btn btn-full" disabled={loading}>
              {loading ? "Création du compte" : "Créer mon compte et continuer"}
            </button>
          </form>
        )}

        {!done && nextPath === "/parcours" && (
          <div className="auth-note">
            <span className="auth-note-title">Le quiz reste optionnel</span>
            <p>Tu peux aussi choisir directement ton premier module.</p>
            <div className="auth-note-actions">
              <SkipQuizLink className="quiz-choose">Voir les parcours →</SkipQuizLink>
              <Link href="/demarrer" className="quiz-choose">
                Faire le quiz →
              </Link>
            </div>
          </div>
        )}

        <div className="auth-alt">
          Déjà un compte ? <Link href={loginHref}>Se connecter</Link>
        </div>
      </div>
    </div>
  );
}
