import type { SupabaseClient } from "$lib/supabase/supabase";

export abstract class Service {
    private _supabase: SupabaseClient;

    constructor(supabase: SupabaseClient) {
        this._supabase = supabase
    }

    protected get supabase() {
        return this._supabase
    }
}