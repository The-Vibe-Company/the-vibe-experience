"use client";

import { useState } from "react";
import Link from "next/link";

type Critere = { key: string; label: string; ok: boolean; etape: string; detail?: string };
type Verdict = {
  valide: boolean;
  criteres: Critere[];
  message: string;
  aTesterToiMeme: string;
  error?: string;
};

const EXEMPLE = `Programme une tâche chaque lundi à 9h : cherche ce qui est nouveau autour des animés, choisis les 2 meilleures idées de contenu pour mon site, et rédige un brouillon pour chacune avec mon skill mon-style. Range tout dans un fichier propositions.md. Ne modifie pas mon site directement : je choisis moi-même ce que j'ajoute.`;

export default function JugeAutomatisationForm() {
  const [consigne, setConsigne] = useState("");
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState<Verdict | null>(null);
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setRes(null);
    setLoading(true);
    try {
      const r = await fetch("/api/juge-automatisation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ consigne }),
      });
      const data = (await r.json()) as Verdict;
      if (!r.ok) {
        setErr(data.error || "Le juge n'a pas pu lire ta consigne. Réessaie.");
      } else {
        setRes(data);
      }
    } catch {
      setErr("Le juge n'a pas pu lire ta consigne. Réessaie.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="juge">
      <form className="juge-form" onSubmit={submit}>
        <label className="juge-field">
          <span>La consigne de ton automatisation</span>
          <textarea
            className="juge-code"
            value={consigne}
            onChange={(e) => setConsigne(e.target.value)}
            placeholder={EXEMPLE}
            rows={8}
            required
          />
        </label>
        <div className="juge-actions">
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Le juge lit ta consigne…" : "Faire évaluer mon automatisation"}
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => setConsigne(EXEMPLE)}>
            Remplir avec un exemple
          </button>
        </div>
        <p className="juge-hint">
          Ta consigne, c&apos;est le texte que tu as donné à Claude Code pour poser ton hook ou
          programmer ta tâche. Si tu ne l&apos;as plus, demande-lui « montre-moi la consigne de ma
          tâche du lundi », copie-la, et colle-la ici.
        </p>
      </form>

      {err && <p className="juge-err">{err}</p>}

      {res && (
        <div className="juge-result">
          <div className={`juge-verdict ${res.valide ? "ok" : "ko"}`}>
            <span className="juge-verdict-tag">{res.valide ? "Validé ✓" : "Presque"}</span>
            <p>{res.message}</p>
          </div>

          <ul className="juge-checklist">
            {res.criteres.map((c) =>
              c.ok ? (
                <li key={c.key} className="ok">
                  <span className="juge-mark" aria-hidden>
                    ✓
                  </span>
                  <span className="juge-label">{c.label}</span>
                  {c.detail && <span className="juge-detail">{c.detail}</span>}
                </li>
              ) : (
                <li key={c.key} className="ko">
                  <span className="juge-mark" aria-hidden>
                    ✗
                  </span>
                  <span className="juge-label">
                    <span className="juge-label-line">
                      {c.label}
                      {c.detail && <span className="juge-detail"> · {c.detail}</span>}
                    </span>
                    <Link href={`/automatiser-ton-travail/${c.etape}`} className="juge-etape">
                      Reprendre l&apos;étape {c.etape} →
                    </Link>
                  </span>
                </li>
              ),
            )}
          </ul>

          <div className="juge-note">
            <div className="label">À tester toi-même</div>
            <p>{res.aTesterToiMeme}</p>
          </div>
        </div>
      )}
    </div>
  );
}
