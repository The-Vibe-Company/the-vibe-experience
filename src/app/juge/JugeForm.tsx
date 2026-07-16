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

export default function JugeForm() {
  const [url, setUrl] = useState("");
  const [sujet, setSujet] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState<Verdict | null>(null);
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setRes(null);
    setLoading(true);
    try {
      const r = await fetch("/api/juge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, sujet, repoUrl }),
      });
      const data = (await r.json()) as Verdict;
      if (!r.ok) {
        setErr(data.error || "Le juge n'a pas pu évaluer ton site. Réessaie.");
      } else {
        setRes(data);
      }
    } catch {
      setErr("Le juge n'a pas pu évaluer ton site. Vérifie ton lien et réessaie.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="juge">
      <form className="juge-form" onSubmit={submit}>
        <label className="juge-field">
          <span>L&apos;adresse de ton site en ligne</span>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="ton-site.vercel.app"
            required
          />
        </label>
        <label className="juge-field">
          <span>Ton sujet, en une phrase (optionnel)</span>
          <input
            type="text"
            value={sujet}
            onChange={(e) => setSujet(e.target.value)}
            placeholder="Un site pour lister mes animés préférés"
          />
        </label>
        <label className="juge-field">
          <span>L&apos;adresse de ton repo GitHub (optionnel)</span>
          <input
            type="text"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="github.com/ton-pseudo/ton-projet"
          />
        </label>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Le juge visite ton site…" : "Faire évaluer mon site"}
        </button>
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
                    <Link href={`/module/${c.etape}`} className="juge-etape">
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
