import type { Database } from "$lib/supabase/database.types";

export type SupabaseSharedGoal = Database['public']['Tables']['shared_goals']['Row'];