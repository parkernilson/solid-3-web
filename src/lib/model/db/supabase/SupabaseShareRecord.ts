import type { Database } from "$lib/supabase/database.types";

export type SupabaseShareRecord = Database['public']['Tables']['share_records']['Row'];