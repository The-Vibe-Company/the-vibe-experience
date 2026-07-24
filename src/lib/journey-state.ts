import { createClient } from "@/lib/supabase/client";

export const QUIZ_RECOMMENDATION_KEY = "tve_quiz_reco";
export const ACTIVE_MODULE_KEY = "tve_active_module";

export type StoredQuizRecommendation = {
  niveau: string;
  objectif: string;
  branche: "construire" | "automatiser";
  moduleHref: string | null;
  moduleTitle: string;
  dismissed?: boolean;
  updatedAt: string;
};

type StoredActiveModule = {
  moduleKey: string;
  updatedAt: string;
};

function readRecommendation() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(QUIZ_RECOMMENDATION_KEY);
    return raw ? (JSON.parse(raw) as StoredQuizRecommendation) : null;
  } catch {
    return null;
  }
}

export function saveQuizRecommendation(recommendation: StoredQuizRecommendation) {
  try {
    window.localStorage.setItem(QUIZ_RECOMMENDATION_KEY, JSON.stringify(recommendation));
    window.dispatchEvent(new CustomEvent("tve-path-choice"));
  } catch {
    // Le quiz reste utilisable même si le stockage du navigateur est indisponible.
  }
}

export function dismissQuizRecommendation() {
  const recommendation = readRecommendation();
  if (!recommendation) return;
  saveQuizRecommendation({ ...recommendation, dismissed: true });
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
    window.dispatchEvent(new CustomEvent("tve-progress"));
  } catch {
    // La progression détaillée reste la source principale.
  }
}

async function writeServerJourney(
  userId: string,
  recommendation: StoredQuizRecommendation | null,
  activeModule: string,
) {
  const supabase = createClient();

  if (recommendation) {
    await supabase
      .from("profiles")
      .update({ niveau: recommendation.niveau, objectif: recommendation.objectif })
      .eq("id", userId);
  }

  const { data: current } = await supabase
    .from("progression")
    .select("id")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const payload = {
    parcours: recommendation,
    module_courant: activeModule || recommendation?.moduleHref || null,
    updated_at: new Date().toISOString(),
  };

  if (current?.id) {
    await supabase.from("progression").update(payload).eq("id", current.id);
  } else if (recommendation || activeModule) {
    await supabase.from("progression").insert({ user_id: userId, ...payload });
  }
}

export async function syncJourneyState(userId: string) {
  const supabase = createClient();
  const localRecommendation = readRecommendation();
  const localActiveModule = readActiveModuleState();
  const { data: serverJourney } = await supabase
    .from("progression")
    .select("parcours, module_courant, updated_at")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

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

  if (serverRecommendation && serverTime > localTime) {
    saveQuizRecommendation(serverRecommendation);
  }
  const localActiveTime = localActiveModule?.updatedAt
    ? new Date(localActiveModule.updatedAt).getTime()
    : 0;
  const serverActiveWins =
    Boolean(serverJourney?.module_courant) && serverTime > localActiveTime;
  if (serverActiveWins && serverJourney?.module_courant) {
    saveActiveModule(serverJourney.module_courant, serverJourney.updated_at);
  }

  const effectiveRecommendation =
    serverRecommendation && serverTime > localTime ? serverRecommendation : localRecommendation;
  const effectiveActiveModule = serverActiveWins
    ? serverJourney?.module_courant ?? ""
    : localActiveModule?.moduleKey || serverJourney?.module_courant || "";
  await writeServerJourney(userId, effectiveRecommendation, effectiveActiveModule);
}

export async function syncActiveModule(moduleKey: string, userId?: string | null) {
  saveActiveModule(moduleKey);
  if (!userId) return;
  await writeServerJourney(userId, readRecommendation(), moduleKey);
}
