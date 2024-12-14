import type { Database } from '$lib/supabase/database.types';
import type { SupabaseCurrentStreakInfo, SupabaseStreakInfo } from './SupabaseStreakInfo';

export type SupabaseGoal = Database['public']['Tables']['goals']['Row'];
export type SupabaseGoalInfo = SupabaseGoal & {
	streak: SupabaseCurrentStreakInfo;
	record: SupabaseStreakInfo;
};
