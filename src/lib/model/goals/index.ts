import type { Database } from "$lib/supabase/database.types";

export type Goal = Database['public']['Tables']['goals']['Row'];
export type Entry = Database['public']['Tables']['entries']['Row'];
export type CurrentStreakInfo = Database['public']['CompositeTypes']['current_streak_info'];
export type GoalWithStreak = Goal & { streak: CurrentStreakInfo };