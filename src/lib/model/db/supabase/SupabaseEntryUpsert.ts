import type { SupabaseEntry } from './SupabaseEntry';

/** Information needed to upsert an entry */
export type SupabaseEntryUpsert = Omit<Partial<SupabaseEntry>, 'created_at'> &
	Required<Pick<SupabaseEntry, 'goal'>>;
