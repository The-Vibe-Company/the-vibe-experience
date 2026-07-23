"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import SkipQuizLink from "@/components/SkipQuizLink";

export default function Inscription() {
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
    const { data, error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    if (data.session) {
      window.location.assign("/compte");
    } else {
      setDone(true);
    }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="label">Crée ton compte</div>
        <h1 style={{ marginTop: ".8rem" }}>Rejoins The Vibe Experience.</h1>
        <p className="sub">
          Ton compte garde ton parcours et ta progression, pour reprendre là où tu t&apos;es arrêté.
        </p>
        <div className="auth-note">
          <span className="auth-note-title">Le quiz est optionnel</span>
          <p>
            Tu peux créer ton compte maintenant, choisir ton parcours directement, ou faire le quiz
            pour être orienté.
          </p>
          <div className="auth-note-actions">
            <SkipQuizLink className="quiz-choose">
              Voir les parcours →
            </SkipQuizLink>
            <Link href="/demarrer" className="quiz-choose">
              Faire le quiz →
            </Link>
          </div>
        </div>

        {done ? (
          <>
            <div className="auth-msg ok">
              C&apos;est presque bon. On t&apos;a envoyé un email de confirmation, clique sur le lien
              pour activer ton compte.
            </div>
            <div className="auth-next">
              <SkipQuizLink className="btn btn-full">
                Voir les parcours →
              </SkipQuizLink>
              <Link href="/demarrer" className="quiz-choose">
                Faire le quiz avant →
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
              {loading ? "Création du compte" : "Créer mon compte"}
            </button>
          </form>
        )}

        <div className="auth-alt">
          Déjà un compte ? <Link href="/connexion">Se connecter</Link>
        </div>
      </div>
    </div>
  );
}
