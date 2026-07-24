import { createClient } from "@/lib/supabase/client";

export const QUIZ_RECOMMENDATION_KEY = "tve_quiz_reco";
export const ACTIVE_MODULE_KEY = "tve_active_module";
const JOURNEY_OWNER_KEY = "tve_journey_owner";
const PATH_EVENT = "tve-path-choice";
const PROGRESS_EVENT = "tve-progress";

export type StoredQuizRecommendation = {
  niveau: string;
  objectif: string;
  branche: "construire" | "automatiser";
  moduleHref: string | null;
  moduleTitle: string;
  dismissed?: boolean;
  updatedAt: string;
};

export type StoredActiveModule = {
  moduleKey: string;
  updatedAt: string;
};

let authedUserId: string | null = null;

export function readQuizRecommendation() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(QUIZ_RECOMMENDATION_KEY);
    return raw ? (JSON.parse(raw) as StoredQuizRecommendation) : null;
  } catch {
    return null;
  }
}

function readOwner() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(JOURNEY_OWNER_KEY);
}

function setOwner(userId: string | null) {
  if (typeof window === "undefined") return;
  try {
    if (userId) window.localStorage.setItem(JOURNEY_OWNER_KEY, userId);
    else window.localStorage.removeItem(JOURNEY_OWNER_KEY);
  } catch {
    // Le stockage peut être indisponible, le parcours reste alors non persistant.
  }
}

export function saveQuizRecommendation(recommendation: StoredQuizRecommendation) {
  try {
    window.localStorage.setItem(QUIZ_RECOMMENDATION_KEY, JSON.stringify(recommendation));
    if (!authedUserId) setOwner("anonymous");
    window.dispatchEvent(new CustomEvent(PATH_EVENT));
  } catch {
    // Le quiz reste utilisable même si le stockage du navigateur est indisponible.
  }
}

function readActiveModuleState(): StoredActiveModule | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(ACTIVE_MODULE_KEY);
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw) as Partial<StoredActiveModule>;
      if (typeof parsed.moduleKey === "string") {
        return {
          moduleKey: parsed.moduleKey,
          updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : "",
        };
      }
    } catch {
      return { moduleKey: raw, updatedAt: "" };
    }
    return null;
  } catch {
    return null;
  }
}

export function readActiveModule() {
  return readActiveModuleState()?.moduleKey ?? "";
}

export function saveActiveModule(moduleKey: string, updatedAt = new Date().toISOString()) {
  try {
    window.localStorage.setItem(
      ACTIVE_MODULE_KEY,
      JSON.stringify({ moduleKey, updatedAt } satisfies StoredActiveModule),
    );
    if (!authedUserId) setOwner("anonymous");
    window.dispatchEvent(new CustomEvent(PROGRESS_EVENT));
  } catch {
    // La progression détaillée reste la source principale.
  }
}

export function replaceLocalJourneyState(
  recommendation: StoredQuizRecommendation | null,
  activeModule: StoredActiveModule | null,
  owner: string | null = null,
) {
  try {
    window.localStorage.removeItem(QUIZ_RECOMMENDATION_KEY);
    window.localStorage.removeItem(ACTIVE_MODULE_KEY);
    setOwner(null);
    if (recommendation) saveQuizRecommendation(recommendation);
    if (activeModule?.moduleKey) saveActiveModule(activeModule.moduleKey, activeModule.updatedAt);
    setOwner(owner);
    window.dispatchEvent(new CustomEvent(PATH_EVENT));
    window.dispatchEvent(new CustomEvent(PROGRESS_EVENT));
  } catch {
    // L'inscription reste possible même sans stockage local.
  }
}

export function clearLocalJourneyState() {
  authedUserId = null;
  replaceLocalJourneyState(null, null);
}

async function writeServerJourney(
  userId: string,
  recommendation: StoredQuizRecommendation | null,
  activeModule: string,
) {
  const supabase = createClient();

  if (recommendation) {
    const { error } = await supabase
      .from("profiles")
      .update({ niveau: recommendation.niveau, objectif: recommendation.objectif })
      .eq("id", userId);
    if (error) throw error;
  }

  const { data: current, error: readError } = await supabase
    .from("progression")
    .select("id")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (readError) throw readError;

  const payload = {
    parcours: recommendation,
    module_courant: activeModule || recommendation?.moduleHref || null,
    updated_at: new Date().toISOString(),
  };

  if (current?.id) {
    const { error } = await supabase.from("progression").update(payload).eq("id", current.id);
    if (error) throw error;
  } else if (recommendation || activeModule) {
    const { error } = await supabase.from("progression").insert({ user_id: userId, ...payload });
    if (error) throw error;
  }
}

async function writeServerActiveModule(userId: string, moduleKey: string) {
  const supabase = createClient();
  const { data: current, error: readError } = await supabase
    .from("progression")
    .select("id")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (readError) throw readError;

  const payload = {
    module_courant: moduleKey,
    updated_at: new Date().toISOString(),
  };
  if (current?.id) {
    const { error } = await supabase.from("progression").update(payload).eq("id", current.id);
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from("progression")
      .insert({ user_id: userId, parcours: null, ...payload });
    if (error) throw error;
  }
}

export async function dismissQuizRecommendation() {
  const recommendation = readQuizRecommendation();
  if (!recommendation) return;
  const dismissed = {
    ...recommendation,
    dismissed: true,
    updatedAt: new Date().toISOString(),
  };
  saveQuizRecommendation(dismissed);
  if (authedUserId) {
    await writeServerJourney(authedUserId, dismissed, readActiveModule());
  }
}

export async function syncJourneyState(userId: string) {
  const supabase = createClient();
  authedUserId = userId;

  const owner = readOwner();
  const canMergeLocal = owner === "anonymous" || owner === userId;
  const localRecommendation = canMergeLocal ? readQuizRecommendation() : null;
  const localActiveModule = canMergeLocal ? readActiveModuleState() : null;
  const { data: serverJourney, error } = await supabase
    .from("progression")
    .select("parcours, module_courant, updated_at")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;

  const serverRecommendation =
    serverJourney?.parcours && typeof serverJourney.parcours === "object"
      ? (serverJourney.parcours as StoredQuizRecommendation)
      : null;
  const localTime = localRecommendation?.updatedAt
    ? new Date(localRecommendation.updatedAt).getTime()
    : 0;
  const serverTime = serverJourney?.updated_at
    ? new Date(serverJourney.updated_at).getTime()
    : 0;
  const serverRecommendationWins =
    Boolean(serverRecommendation) && (!canMergeLocal || serverTime > localTime);

  if (!canMergeLocal) {
    replaceLocalJourneyState(null, null);
  }
  if (serverRecommendationWins && serverRecommendation) {
    saveQuizRecommendation(serverRecommendation);
  }

  const localActiveTime = localActiveModule?.updatedAt
    ? new Date(localActiveModule.updatedAt).getTime()
    : 0;
  const serverActiveWins =
    Boolean(serverJourney?.module_courant) && (!canMergeLocal || serverTime > localActiveTime);
  if (serverActiveWins && serverJourney?.module_courant) {
    saveActiveModule(serverJourney.module_courant, serverJourney.updated_at);
  }

  const effectiveRecommendation =
    serverRecommendationWins ? serverRecommendation : localRecommendation || serverRecommendation;
  const effectiveActiveModule = serverActiveWins
    ? serverJourney?.module_courant ?? ""
    : localActiveModule?.moduleKey || serverJourney?.module_courant || "";
  await writeServerJourney(userId, effectiveRecommendation, effectiveActiveModule);
  setOwner(userId);
}

export async function syncActiveModule(moduleKey: string, userId?: string | null) {
  saveActiveModule(moduleKey);
  if (!userId) return;
  await writeServerActiveModule(userId, moduleKey);
}
