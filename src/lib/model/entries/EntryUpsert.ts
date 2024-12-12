import type { Entry } from "../goals";

/** Information needed to upsert an entry */
export type EntryUpsert = Omit<Partial<Entry>, 'created_at'> & Required<Pick<Entry, 'goal'>>