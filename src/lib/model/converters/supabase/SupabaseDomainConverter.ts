import type { SupabaseEntry } from '$lib/model/db/supabase/SupabaseEntry';
import type { SupabaseGoal } from '$lib/model/db/supabase/SupabaseGoal';
import type { SupabaseSharedGoal } from '$lib/model/db/supabase/SupabaseSharedGoal';
import type { SupabaseSharedGoalPreview } from '$lib/model/db/supabase/SupabaseSharedGoalPreview';
import type { SupabaseShareRecord } from '$lib/model/db/supabase/SupabaseShareRecord';
import type {
	SupabaseCurrentStreakInfo,
	SupabaseStreakInfo
} from '$lib/model/db/supabase/SupabaseStreakInfo';
import type { SupabaseUserProfile } from '$lib/model/db/supabase/SupabaseUserProfile';
import {
	CurrentStreakInfo,
	Entry,
	Goal,
	StreakInfo,
	type ISharedGoalPreview
} from '$lib/model/domain/goals';
import type { ISharedGoal } from '$lib/model/domain/goals/SharedGoal';
import { ShareRecord } from '$lib/model/domain/goals/ShareRecord';
import { UserProfile } from '$lib/model/domain/users';

export class SupabaseDomainConverter {
	convertGoal(goal: SupabaseGoal): Goal {
		return new Goal(goal.id, goal.owner, goal.title, goal.created_at);
	}

	convertEntry(entry: SupabaseEntry): Entry {
		return new Entry(entry.id, entry.goal, entry.text_content, entry.date_of, entry.success);
	}

	convertStreakInfo(streakInfo: SupabaseStreakInfo): StreakInfo {
		return new StreakInfo(streakInfo.start_date, streakInfo.end_date, streakInfo.streak_count);
	}

	convertCurrentStreakInfo(currentStreakInfo: SupabaseCurrentStreakInfo): CurrentStreakInfo {
		return new CurrentStreakInfo(
			currentStreakInfo.start_date,
			currentStreakInfo.end_date,
			currentStreakInfo.streak_count,
			currentStreakInfo.current_period_success
		);
	}

	convertUserProfile(userProfile: SupabaseUserProfile): UserProfile {
		return new UserProfile(
			userProfile.id,
			userProfile.email,
			userProfile.profile_image_path ?? undefined
		);
	}

	convertShareRecord(
		userProfile: UserProfile,
		shareRecord: SupabaseShareRecord
	): ShareRecord {
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
			startDate: sharedGoal.created_at,
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
			shareStatus: sharedGoalPreview.share_status,
			sharedWith: sharedGoalPreview.shared_with,
			sharedOn: sharedGoalPreview.shared_on
		};
	}
}
