
import type { Database } from "$lib/supabase/database.types";
import type { NonNullableRow } from "$lib/utils/types/isNotNullRow";

export type SupabaseSharedGoalPreview = NonNullableRow<Database['public']['Views']['shared_goal_previews']['Row']>;