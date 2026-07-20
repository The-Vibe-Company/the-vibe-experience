"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { createClient } from "@/lib/supabase/client";

// Progression d'un module, au niveau SOUS-étape.
// Source immédiate : le navigateur (localStorage), pour que ça marche tout de suite, même sans compte.
// Si l'utilisateur est connecté, on synchronise en plus avec Supabase : la progression est alors
// gardée sur son compte et se retrouve même s'il change de machine ou vide son navigateur.

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

// --- Synchronisation compte (Supabase) --------------------------------------
// Le compte connecté, posé par <ProgressSync /> au chargement et à chaque login/logout.
let authedUserId: string | null = null;
let supa: ReturnType<typeof createClient> | null = null;

function client() {
  if (!supa) supa = createClient();
  return supa;
}

// Envoie l'état d'un module vers le compte. Silencieux : si le réseau ou la table manque,
// le local reste la source de vérité.
async function pushModule(moduleKey: string, done: string[]) {
  if (!authedUserId) return;
  try {
    await client()
      .from("module_progress")
      .upsert(
        { user_id: authedUserId, module_key: moduleKey, done, updated_at: new Date().toISOString() },
        { onConflict: "user_id,module_key" },
      );
  } catch {
    // hors-ligne ou table absente : on garde le local.
  }
}

// Au login : réconcilie le local et le compte (union, pour ne perdre aucune étape faite d'un côté
// ou de l'autre), met à jour le local si le serveur apporte du neuf, et pousse vers le serveur ce
// que seul le local connaît (utile quand on crée son compte après avoir déjà avancé).
export async function hydrateFromServer(userId: string) {
  authedUserId = userId;
  if (typeof window === "undefined") return;

  let rows: { module_key: string; done: string[] | null }[] = [];
  try {
    const { data, error } = await client()
      .from("module_progress")
      .select("module_key, done")
      .eq("user_id", userId);
    if (error) return;
    rows = data ?? [];
  } catch {
    return;
  }

  const local = read();
  const serverByKey = new Map(rows.map((r) => [r.module_key, new Set(r.done ?? [])]));
  const keys = new Set<string>([...Object.keys(local), ...serverByKey.keys()]);

  let localChanged = false;
  for (const mk of keys) {
    const localDone = new Set(local[mk]?.done ?? []);
    const serverDone = serverByKey.get(mk) ?? new Set<string>();
    const merged = new Set<string>([...localDone, ...serverDone]);

    if (merged.size !== localDone.size) {
      local[mk] = { ...local[mk], done: [...merged] };
      localChanged = true;
    }
    if (merged.size !== serverDone.size) {
      void pushModule(mk, [...merged]);
    }
  }

  if (localChanged) write(local);
}

// Au logout : on arrête de pousser vers le compte. Le local reste, pour ne pas effacer l'écran.
export function stopSync() {
  authedUserId = null;
}

function subscribeProgress(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener(EVT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(EVT, callback);
  };
}

function readModuleSnapshot(moduleKey: string) {
  if (typeof window === "undefined") return "";
  const entry = read()[moduleKey];
  return JSON.stringify({ done: entry?.done ?? [], started: Boolean(entry?.started) });
}

// --- Suivi « module commencé » (pour l'accueil du parcours) -----------------
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
  const snapshot = useSyncExternalStore(
    subscribeProgress,
    () => (hasAnyModuleStarted() ? "1" : "0"),
    () => "",
  );
  return { started: snapshot === "1", mounted: snapshot !== "" };
}

export function useMarkModuleStarted(moduleKey: string) {
  useEffect(() => {
    markModuleStarted(moduleKey);
  }, [moduleKey]);
}

export function useModuleProgress(moduleKey: string) {
  const moduleSnapshot = useSyncExternalStore(
    subscribeProgress,
    () => readModuleSnapshot(moduleKey),
    () => "",
  );
  const parsed = moduleSnapshot
    ? (JSON.parse(moduleSnapshot) as { done?: string[]; started?: boolean })
    : null;
  const done = parsed?.done ?? [];
  const started = Boolean(parsed?.started);
  const mounted = moduleSnapshot !== "";

  const setDoneState = useCallback(
    (id: string, value: boolean) => {
      const s = read();
      const cur = new Set(s[moduleKey]?.done ?? []);
      if (value) cur.add(id);
      else cur.delete(id);
      s[moduleKey] = { ...s[moduleKey], done: [...cur] };
      write(s);
      void pushModule(moduleKey, [...cur]);
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
    started,
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

export function computeStats(etapes: EtapeLite[], done: string[], started = false): ModuleStats {
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
    started: started || doneCount > 0,
  };
}
