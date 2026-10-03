export function isRecord(value: unknown): value is Record<string, unknown> {
 return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

export function readStored<T>(
 key: string,
 seed: () => T,
 parse: (value: unknown) => T | undefined
): T {
 try {
  const raw = localStorage.getItem(key)
  if (raw) {
   const parsed = parse(JSON.parse(raw) as unknown)
   if (parsed !== undefined) {
    return parsed
   }
  }
 } catch {
  // Fall through to seed data when storage is unreadable.
 }
 const initial = seed()
 writeStored(key, initial)
 return initial
}

export function writeStored(key: string, value: unknown) {
 try {
  localStorage.setItem(key, JSON.stringify(value))
 } catch {
  // Keep the in-memory example when storage is unavailable.
 }
}

export function nextId(items: { id: string }[]) {
 let max = 0
 for (const item of items) {
  const value = Number(item.id)
  if (Number.isFinite(value) && value > max) {
   max = value
  }
 }
 return String(max + 1)
}
