import type { Database } from "$lib/supabase/database.types";
import { createClient } from "@supabase/supabase-js";

import {
    PUBLIC_SUPABASE_ANON_KEY,
    PUBLIC_SUPABASE_CONNECT_URL
} from "$env/static/public";
import type { SupabaseClient } from "$lib/supabase/supabase";

export class SupabaseFactory {
    public createSupabaseClient(): SupabaseClient {
        if (!PUBLIC_SUPABASE_CONNECT_URL) throw new Error("PUBLIC_SUPABASE_CONNECT_URL env var is required");
        if (!PUBLIC_SUPABASE_ANON_KEY) throw new Error("PUBLIC_SUPABASE_ANON_KEY env var is required");
        return createClient<Database>(
            PUBLIC_SUPABASE_CONNECT_URL,
            PUBLIC_SUPABASE_ANON_KEY
        );
    }
}