"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ConnexionForm({
  nextPath,
  confirmationError,
}: {
  nextPath: string;
  confirmationError: boolean;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    confirmationError
      ? "Le lien de confirmation n’a pas fonctionné. Connecte-toi pour continuer."
      : null,
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    window.location.assign(nextPath);
  }

  const signupHref = `/inscription?next=${encodeURIComponent(nextPath)}`;

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="label">Connexion</div>
        <h1 style={{ marginTop: ".8rem" }}>Content de te revoir.</h1>
        <p className="sub">Reprends ton parcours là où tu l&apos;as laissé.</p>

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
              placeholder="Ton mot de passe"
            />
          </div>
          <button type="submit" className="btn btn-full" disabled={loading}>
            {loading ? "Connexion en cours" : "Se connecter et continuer"}
          </button>
        </form>

        <div className="auth-alt">
          Pas encore de compte ? <Link href={signupHref}>Créer un compte</Link>
        </div>
      </div>
    </div>
  );
}
