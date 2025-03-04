import type { Database } from '$lib/supabase/database.types';
import type {
	SupabaseCurrentStreakInfoNotNull,
	SupabaseStreakInfoNotNull
} from './SupabaseStreakInfo';

export type SupabaseGoal = Database['public']['Tables']['goals']['Row'];
export type SupabaseGoalInfo = SupabaseGoal & {
	streak: SupabaseCurrentStreakInfoNotNull;
	record: SupabaseStreakInfoNotNull;
};
