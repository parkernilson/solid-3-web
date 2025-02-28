import type { Database } from '$lib/supabase/database.types';
import { isNotNullExcept, type NonNullableRowExcept } from '$lib/utils/types/isNotNullRow';

type _SupabaseSharedGoal = Database['public']['Views']['shared_goals']['Row'];

export type SupabaseSharedGoal = NonNullableRowExcept<
	_SupabaseSharedGoal,
	'owner_profile_image_path'
>;

export const isSupabaseSharedGoal = isNotNullExcept<_SupabaseSharedGoal, 'owner_profile_image_path'>({
	except: ['owner_profile_image_path']
});
