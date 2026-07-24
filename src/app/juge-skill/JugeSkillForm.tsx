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

const EXEMPLE = `---
name: documente-mon-projet
description: À utiliser quand je construis une nouvelle fonctionnalité, pour documenter proprement ce que j'ai fait, à chaque fois de la même façon.
---

Quand je te le demande :
1. Résume en une phrase ce que fait la fonctionnalité.
2. Note les fichiers touchés et pourquoi.
3. Écris ça dans un fichier NOTES.md, à la suite.`;

export default function JugeSkillForm() {
  const [contenu, setContenu] = useState("");
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState<Verdict | null>(null);
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setRes(null);
    setLoading(true);
    try {
      const r = await fetch("/api/juge-skill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contenu }),
      });
      const data = (await r.json()) as Verdict;
      if (!r.ok) {
        setErr(data.error || "Le juge n'a pas pu lire ton skill. Réessaie.");
      } else {
        setRes(data);
      }
    } catch {
      setErr("Le juge n'a pas pu lire ton skill. Réessaie.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="juge">
      <form className="juge-form" onSubmit={submit}>
        <label className="juge-field">
          <span>Le contenu de ton fichier SKILL.md</span>
          <textarea
            className="juge-code"
            value={contenu}
            onChange={(e) => setContenu(e.target.value)}
            placeholder={EXEMPLE}
            rows={12}
            required
          />
        </label>
        <div className="juge-actions">
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Lecture du skill en cours" : "Faire évaluer mon skill"}
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => setContenu(EXEMPLE)}
          >
            Remplir avec un exemple
          </button>
        </div>
        <p className="juge-hint">
          Pour retrouver ton fichier, demande à Claude Code « montre-moi le contenu de mon fichier
          SKILL.md », copie-le, et colle-le ici.
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
                    <Link href={`/creer-un-skill/${c.etape}`} className="juge-etape">
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
