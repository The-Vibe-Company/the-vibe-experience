"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type State = "idle" | "saving" | "done" | "error";

export default function ChangePassword() {
  const [open, setOpen] = useState(false);
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [state, setState] = useState<State>("idle");
  const [msg, setMsg] = useState("");

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (pw.length < 8) {
      setState("error");
      setMsg("Choisis un mot de passe d'au moins 8 caractères.");
      return;
    }
    if (pw !== pw2) {
      setState("error");
      setMsg("Les deux mots de passe ne sont pas identiques.");
      return;
    }
    setState("saving");
    setMsg("");
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: pw });
    if (error) {
      setState("error");
      setMsg(error.message);
      return;
    }
    setState("done");
    setMsg("Ton mot de passe est modifié.");
    setPw("");
    setPw2("");
    setOpen(false);
  }

  return (
    <>
      <div className="acct-row">
        <span className="acct-k">Mot de passe</span>
        <span className="acct-v acct-pw-v">
          <span className="acct-dots">••••••••</span>
          <button
            type="button"
            className="acct-link"
            onClick={() => {
              setOpen((o) => !o);
              setMsg("");
            }}
          >
            {open ? "Annuler" : "Modifier"}
          </button>
        </span>
      </div>
      {open && (
        <form className="acct-pwform" onSubmit={save}>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Nouveau mot de passe"
            autoComplete="new-password"
          />
          <input
            type="password"
            value={pw2}
            onChange={(e) => setPw2(e.target.value)}
            placeholder="Confirme le mot de passe"
            autoComplete="new-password"
          />
          <button type="submit" className="btn" disabled={state === "saving"}>
            {state === "saving" ? "Enregistrement…" : "Enregistrer"}
          </button>
        </form>
      )}
      {msg && <p className={`acct-pwmsg ${state === "error" ? "err" : "ok"}`}>{msg}</p>}
    </>
  );
}
