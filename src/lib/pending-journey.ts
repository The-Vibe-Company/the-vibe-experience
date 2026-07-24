"use client";

import {
  readActiveModule,
  readQuizRecommendation,
  replaceLocalJourneyState,
  type StoredActiveModule,
  type StoredQuizRecommendation,
} from "@/lib/journey-state";
import {
  readProgressStore,
  replaceProgressStore,
  type ProgressStore,
} from "@/lib/progress";

export const PENDING_JOURNEY_METADATA_KEY = "tve_pending_journey";

type PendingJourneySnapshot = {
  version: 1;
  createdAt: string;
  recommendation: StoredQuizRecommendation | null;
  activeModule: StoredActiveModule | null;
  progress: ProgressStore;
};

export function createPendingJourneySnapshot(): PendingJourneySnapshot {
  const moduleKey = readActiveModule();
  return {
    version: 1,
    createdAt: new Date().toISOString(),
    recommendation: readQuizRecommendation(),
    activeModule: moduleKey
      ? { moduleKey, updatedAt: new Date().toISOString() }
      : null,
    progress: readProgressStore(),
  };
}

function parseRecommendation(value: unknown): StoredQuizRecommendation | null {
  if (!value || typeof value !== "object") return null;
  const candidate = value as Partial<StoredQuizRecommendation>;
  if (
    typeof candidate.niveau !== "string" ||
    typeof candidate.objectif !== "string" ||
    (candidate.branche !== "construire" && candidate.branche !== "automatiser") ||
    (candidate.moduleHref !== null && typeof candidate.moduleHref !== "string") ||
    typeof candidate.moduleTitle !== "string" ||
    typeof candidate.updatedAt !== "string"
  ) {
    return null;
  }
  return {
    niveau: candidate.niveau.slice(0, 100),
    objectif: candidate.objectif.slice(0, 200),
    branche: candidate.branche,
    moduleHref: candidate.moduleHref?.slice(0, 200) ?? null,
    moduleTitle: candidate.moduleTitle.slice(0, 200),
    dismissed: Boolean(candidate.dismissed),
    updatedAt: candidate.updatedAt,
  };
}

function parseActiveModule(value: unknown): StoredActiveModule | null {
  if (!value || typeof value !== "object") return null;
  const candidate = value as Partial<StoredActiveModule>;
  if (typeof candidate.moduleKey !== "string" || typeof candidate.updatedAt !== "string") {
    return null;
  }
  return {
    moduleKey: candidate.moduleKey.slice(0, 200),
    updatedAt: candidate.updatedAt,
  };
}

function parseProgress(value: unknown): ProgressStore {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const result: ProgressStore = {};
  for (const [moduleKey, entry] of Object.entries(value).slice(0, 30)) {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) continue;
    const candidate = entry as { done?: unknown; started?: unknown };
    const done = Array.isArray(candidate.done)
      ? candidate.done
          .filter((item): item is string => typeof item === "string")
          .slice(0, 500)
          .map((item) => item.slice(0, 200))
      : [];
    result[moduleKey.slice(0, 200)] = {
      done,
      started: Boolean(candidate.started),
    };
  }
  return result;
}

export function readPendingJourneySnapshot(
  userMetadata: Record<string, unknown> | null | undefined,
): PendingJourneySnapshot | null {
  const value = userMetadata?.[PENDING_JOURNEY_METADATA_KEY];
  if (!value || typeof value !== "object") return null;
  const candidate = value as Partial<PendingJourneySnapshot>;
  if (candidate.version !== 1 || typeof candidate.createdAt !== "string") return null;
  return {
    version: 1,
    createdAt: candidate.createdAt,
    recommendation: parseRecommendation(candidate.recommendation),
    activeModule: parseActiveModule(candidate.activeModule),
    progress: parseProgress(candidate.progress),
  };
}

export function applyPendingJourneySnapshot(snapshot: PendingJourneySnapshot) {
  replaceProgressStore(snapshot.progress, "anonymous");
  replaceLocalJourneyState(snapshot.recommendation, snapshot.activeModule, "anonymous");
}
