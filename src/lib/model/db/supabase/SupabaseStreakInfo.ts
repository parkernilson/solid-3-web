import type { Database } from '$lib/supabase/database.types';
import type { NonNullableRow } from '$lib/utils/types/isNotNullRow';

export type SupabaseCurrentStreakInfo = NonNullableRow<Database['public']['Functions']['get_current_streak_info']['Returns']>
export type SupabaseStreakInfo = NonNullableRow<Database['public']['Views']['streak_summary']['Row']>
