import type { SupabaseClient } from "$lib/supabase/supabase";
import { ErrorService } from "./ErrorService.svelte";

export abstract class SupabaseService {
    private _supabase: SupabaseClient;
    protected errorService: ErrorService;

    constructor(supabase: SupabaseClient, errorService: ErrorService) {
        this._supabase = supabase
        this.errorService = errorService
    }

    protected get supabase() {
        return this._supabase
    }
}