"use client";

import { useCallback, useEffect, useState } from "react";

// Progression d'un module, au niveau SOUS-étape, stockée en local (pas besoin de compte).
// Objectif : l'utilisateur ne se souvient plus d'où il en est, le site le sait pour lui.

const KEY = "tve_progress_v2";
const EVT = "tve-progress";

type Store = Record<string, { done: string[]; started?: boolean }>;

// Id stable d'une sous-étape : slug de l'étape + index (0-based).
export function sousId(etapeSlug: string, i: number): string {
  return `${etapeSlug}.${i}`;
}

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
    // stockage indisponible : le suivi est juste non persistant.
  }
}

export function hasAnyModuleStarted() {
  const s = read();
  return Object.values(s).some((entry) => entry.started || (entry.done?.length ?? 0) > 0);
}

export function markModuleStarted(moduleKey: string) {
  const s = read();
  const cur = s[moduleKey] ?? { done: [] };
  if (cur.started) return;
  s[moduleKey] = { ...cur, done: cur.done ?? [], started: true };
  write(s);
}

export function useAnyModuleStarted() {
  const [started, setStarted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const refresh = () => setStarted(hasAnyModuleStarted());
    queueMicrotask(() => {
      refresh();
      setMounted(true);
    });
    window.addEventListener("storage", refresh);
    window.addEventListener(EVT, refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener(EVT, refresh);
    };
  }, []);

  return { started, mounted };
}

export function useMarkModuleStarted(moduleKey: string) {
  useEffect(() => {
    markModuleStarted(moduleKey);
  }, [moduleKey]);
}

export function useModuleProgress(moduleKey: string) {
  const [done, setDone] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const refresh = () => setDone(read()[moduleKey]?.done ?? []);
    queueMicrotask(() => {
      refresh();
      setMounted(true);
    });
    window.addEventListener("storage", refresh);
    window.addEventListener(EVT, refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener(EVT, refresh);
    };
  }, [moduleKey]);

  const setDoneState = useCallback(
    (id: string, value: boolean) => {
      const s = read();
      const cur = new Set(s[moduleKey]?.done ?? []);
      if (value) cur.add(id);
      else cur.delete(id);
      s[moduleKey] = { done: [...cur] };
      write(s);
      setDone([...cur]);
    },
    [moduleKey],
  );

  const toggle = useCallback(
    (id: string) => {
      const cur = read()[moduleKey]?.done ?? [];
      setDoneState(id, !cur.includes(id));
    },
    [moduleKey, setDoneState],
  );

  return {
    done,
    mounted,
    isDone: (id: string) => done.includes(id),
    setDone: setDoneState,
    toggle,
  };
}

// Structure minimale d'un module pour calculer les stats de progression.
export type EtapeLite = { slug: string; num: string; titre: string; sousCount: number };

export type ModuleStats = {
  total: number;
  doneCount: number;
  etapes: {
    slug: string;
    num: string;
    titre: string;
    total: number;
    done: number;
    complete: boolean;
    subDone: boolean[]; // par sous-étape, dans l'ordre
  }[];
  // Première sous-étape non faite, dans l'ordre du module.
  current: { etapeSlug: string; etapeNum: string; subIndex: number } | null;
  allDone: boolean;
  started: boolean;
};

export function computeStats(etapes: EtapeLite[], done: string[]): ModuleStats {
  const set = new Set(done);
  let total = 0;
  let doneCount = 0;
  let current: ModuleStats["current"] = null;

  const etapeStats = etapes.map((e) => {
    const subDone: boolean[] = [];
    let d = 0;
    for (let i = 0; i < e.sousCount; i++) {
      const ok = set.has(sousId(e.slug, i));
      subDone.push(ok);
      if (ok) d++;
      else if (!current) current = { etapeSlug: e.slug, etapeNum: e.num, subIndex: i };
    }
    total += e.sousCount;
    doneCount += d;
    return {
      slug: e.slug,
      num: e.num,
      titre: e.titre,
      total: e.sousCount,
      done: d,
      complete: e.sousCount > 0 && d === e.sousCount,
      subDone,
    };
  });

  return {
    total,
    doneCount,
    etapes: etapeStats,
    current,
    allDone: total > 0 && doneCount === total,
    started: doneCount > 0,
  };
}
