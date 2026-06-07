import type { DictionaryEntry } from "../data/seed";

const CONTRIBUTIONS_KEY = "dicionario-local-contributions";

export type DraftContribution = Omit<DictionaryEntry, "id" | "validation">;

export function loadContributions(): DictionaryEntry[] {
  try {
    const raw = window.localStorage.getItem(CONTRIBUTIONS_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveContribution(draft: DraftContribution): DictionaryEntry[] {
  const current = loadContributions();
  const next: DictionaryEntry = {
    ...draft,
    id: `contrib-${Date.now()}`,
    validation: "por_validar",
  };
  const updated = [next, ...current];
  window.localStorage.setItem(CONTRIBUTIONS_KEY, JSON.stringify(updated));
  return updated;
}

export function clearContributions(): void {
  window.localStorage.removeItem(CONTRIBUTIONS_KEY);
}
