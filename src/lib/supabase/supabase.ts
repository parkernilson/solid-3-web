import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

/**
 * See for issues or more info on generated supabase types:
 * https://supabase.com/docs/guides/api/rest/generating-types
 */

export type SupabaseClient = ReturnType<typeof createClient<Database>>;