import type { Database } from '$lib/supabase/database.types';
import { isNotNullRow, type NonNullableRow } from '$lib/utils/types/isNotNullRow';

type SupabaseCurrentStreakInfo =
	Database['public']['Functions']['get_current_streak_info']['Returns'];
type SupabaseStreakInfo = Database['public']['Views']['streak_summary']['Row'];

export type SupabaseCurrentStreakInfoNotNull = NonNullableRow<SupabaseCurrentStreakInfo>;
export const isSupabaseCurrentStreakInfoNull = (data: SupabaseCurrentStreakInfo) => {
	// NOTE: I am checking start_date arbitrarily, it could be any of the null fields
	return data.start_date === null;
};
export const isSupabaseCurrentStreakInfoNotNull = isNotNullRow<SupabaseCurrentStreakInfo>;

export type SupabaseStreakInfoNotNull = NonNullableRow<SupabaseStreakInfo>;
export const isSupabaseStreakInfoNull = (data: SupabaseStreakInfo) => {
	// NOTE: I am checking start_date arbitrarily, it could be any of the null fields
	return data.start_date === null;
};
export const isSupabaseStreakInfoNotNull = isNotNullRow<SupabaseStreakInfo>;
