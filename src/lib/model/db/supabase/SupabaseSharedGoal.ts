import type { Database } from "$lib/supabase/database.types";
import type { NonNullableRow } from "$lib/utils/types/isNotNullRow";

export type SupabaseSharedGoal = NonNullableRow<Database['public']['Views']['shared_goals']['Row']>;