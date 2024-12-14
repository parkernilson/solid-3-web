import type { Database } from "$lib/supabase/database.types";

export type SupabaseEntry = 
	Database['public']['Tables']['entries']['Row'];