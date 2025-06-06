import type { SupabaseEntry } from '$lib/model/db/supabase/SupabaseEntry';
import type { SupabaseGoal } from '$lib/model/db/supabase/SupabaseGoal';
import type { SupabaseSharedGoal } from '$lib/model/db/supabase/SupabaseSharedGoal';
import type { SupabaseSharedGoalPreview } from '$lib/model/db/supabase/SupabaseSharedGoalPreview';
import type { SupabaseShareRecord } from '$lib/model/db/supabase/SupabaseShareRecord';
import type {
	SupabaseCurrentStreakInfoNotNull,
	SupabaseStreakInfoNotNull
} from '$lib/model/db/supabase/SupabaseStreakInfo';
import type { SupabaseUserProfile } from '$lib/model/db/supabase/SupabaseUserProfile';
import {
	type ICurrentStreakInfo,
	type IEntry,
	type IGoal,
	type ISharedGoalPreview,
	type IStreakInfo
} from '$lib/model/domain/goals';
import type { ISharedGoal } from '$lib/model/domain/goals/SharedGoal';
import { ShareRecord } from '$lib/model/domain/goals/ShareRecord';
import { UserProfile } from '$lib/model/domain/users';

export class SupabaseDomainConverter {
	convertGoal(goal: SupabaseGoal): IGoal {
		return {
			id: goal.id,
			title: goal.title,
			startDate: goal.start_date,
			owner: goal.owner
		};
	}

	convertEntry(entry: SupabaseEntry): IEntry {
		return {
			id: entry.id,
			goal: entry.goal,
			textContent: entry.text_content,
			dateOf: entry.date_of,
			success: entry.success
		};
	}

	convertStreakInfo(streakInfo: SupabaseStreakInfoNotNull): IStreakInfo {
		return {
			startDate: streakInfo.start_date,
			endDate: streakInfo.end_date,
			streakCount: streakInfo.streak_count
		};
	}

	convertCurrentStreakInfo(
		currentStreakInfo: SupabaseCurrentStreakInfoNotNull
	): ICurrentStreakInfo {
		return {
			startDate: currentStreakInfo.start_date,
			endDate: currentStreakInfo.end_date,
			streakCount: currentStreakInfo.streak_count,
			currentPeriodSuccess: currentStreakInfo.current_period_success
		};
	}

	convertUserProfile(userProfile: SupabaseUserProfile): UserProfile {
		return new UserProfile(
			userProfile.id,
			userProfile.email,
			userProfile.profile_image_path ?? undefined
		);
	}

	convertShareRecord(userProfile: UserProfile, shareRecord: SupabaseShareRecord): ShareRecord {
		return new ShareRecord(
			userProfile,
			shareRecord.goal,
			shareRecord.status,
			shareRecord.created_at
		);
	}

	convertSharedGoal(sharedGoal: SupabaseSharedGoal): ISharedGoal {
		return {
			id: sharedGoal.goal_id,
			title: sharedGoal.title,
			owner: sharedGoal.owner,
			ownerEmail: sharedGoal.owner_email,
			ownerProfileImagePath: sharedGoal.owner_profile_image_path ?? undefined,
			startDate: sharedGoal.start_date,
			sharedOn: sharedGoal.shared_on
		};
	}

	convertSharedGoalPreview(sharedGoalPreview: SupabaseSharedGoalPreview): ISharedGoalPreview {
		return {
			id: sharedGoalPreview.goal_id,
			goalId: sharedGoalPreview.goal_id,
			shareRecordId: sharedGoalPreview.share_record_id,
			goalTitle: sharedGoalPreview.goal_title,
			goalOwnerId: sharedGoalPreview.goal_owner_id,
			goalOwnerEmail: sharedGoalPreview.goal_owner_email,
			goalOwnerProfileImagePath: sharedGoalPreview.goal_owner_profile_image_path ?? undefined,
			shareStatus: sharedGoalPreview.share_status,
			sharedWith: sharedGoalPreview.shared_with,
			sharedOn: sharedGoalPreview.shared_on
		};
	}
}
