import type { Database } from "$lib/supabase/database.types";

export type SupabaseUserProfile = Database['public']['Tables']['profiles']['Row'];