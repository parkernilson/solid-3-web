import type { Database } from '$lib/supabase/database.types';
import {
	isNotNullExcept,
	type NonNullableRowExcept
} from '$lib/utils/types/isNotNullRow';

type _SupabaseSharedGoalPreview = Database['public']['Views']['shared_goal_previews']['Row'];

export type SupabaseSharedGoalPreview = NonNullableRowExcept<
	_SupabaseSharedGoalPreview,
	'goal_owner_profile_image_path'
>;

export const isSupabaseSharedGoalPreview = isNotNullExcept<
	_SupabaseSharedGoalPreview,
	'goal_owner_profile_image_path'
>({ except: ['goal_owner_profile_image_path'] });
