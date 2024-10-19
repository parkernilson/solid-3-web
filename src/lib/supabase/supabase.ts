import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

import {
	PUBLIC_SUPABASE_CONNECT_URL,
	PUBLIC_SUPABASE_ANON_KEY
} from "$env/static/public";

if (!PUBLIC_SUPABASE_CONNECT_URL) throw new Error("PUBLIC_SUPABASE_CONNECT_URL env var is required");
if (!PUBLIC_SUPABASE_ANON_KEY) throw new Error("PUBLIC_SUPABASE_ANON_KEY env var is required");

/**
 * See for issues or more info on generated supabase types:
 * https://supabase.com/docs/guides/api/rest/generating-types
 */

export const supabase = createClient<Database>(
	PUBLIC_SUPABASE_CONNECT_URL,
	PUBLIC_SUPABASE_ANON_KEY
);
export type SupabaseClient = typeof supabase;