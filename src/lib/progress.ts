"use client";

import { useCallback, useEffect, useState } from "react";

// Progression d'un module, stockée en local (pas besoin de compte).
// Objectif : l'utilisateur n'a plus à se souvenir où il en est, le site le sait pour lui.

const KEY = "tve_progress_v1";
const EVT = "tve-progress";

type Store = Record<string, { done: string[] }>;

function read(): Store {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(KEY) || "{}") as Store;
  } catch {
    return {};
  }
}

function write(s: Store) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(s));
    window.dispatchEvent(new CustomEvent(EVT));
  } catch {
    // stockage indisponible (navigation privée stricte) : on ignore, le suivi est juste non persistant.
  }
}

export function useModuleProgress(moduleKey: string) {
  const [done, setDone] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const refresh = () => setDone(read()[moduleKey]?.done ?? []);
    refresh();
    setMounted(true);
    window.addEventListener("storage", refresh);
    window.addEventListener(EVT, refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener(EVT, refresh);
    };
  }, [moduleKey]);

  const setDoneState = useCallback(
    (slug: string, value: boolean) => {
      const s = read();
      const cur = new Set(s[moduleKey]?.done ?? []);
      if (value) cur.add(slug);
      else cur.delete(slug);
      s[moduleKey] = { done: [...cur] };
      write(s);
      setDone([...cur]);
    },
    [moduleKey],
  );

  const toggle = useCallback(
    (slug: string) => {
      const cur = read()[moduleKey]?.done ?? [];
      setDoneState(slug, !cur.includes(slug));
    },
    [moduleKey, setDoneState],
  );

  return {
    done,
    mounted,
    isDone: (slug: string) => done.includes(slug),
    setDone: setDoneState,
    toggle,
  };
}
