import type { SupabaseEntry } from '$lib/model/db/supabase/SupabaseEntry';
import type { SupabaseGoal } from '$lib/model/db/supabase/SupabaseGoal';
import type { SupabaseSharedGoal } from '$lib/model/db/supabase/SupabaseSharedGoal';
import type { SupabaseShareRecord } from '$lib/model/db/supabase/SupabaseShareRecord';
import type {
	SupabaseCurrentStreakInfo,
	SupabaseStreakInfo
} from '$lib/model/db/supabase/SupabaseStreakInfo';
import type { SupabaseUserProfile } from '$lib/model/db/supabase/SupabaseUserProfile';
import { CurrentStreakInfo, Entry, Goal, SharedGoal, StreakInfo } from '$lib/model/domain/goals';
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
		return new UserProfile(userProfile.id, userProfile.email);
	}

	convertShareRecord(
		userProfile: SupabaseUserProfile,
		shareRecord: SupabaseShareRecord
	): ShareRecord {
		return new ShareRecord(
			this.convertUserProfile(userProfile),
			shareRecord.goal,
			shareRecord.status,
			shareRecord.created_at
		);
	}

	convertSharedGoal(sharedGoal: SupabaseSharedGoal): SharedGoal {
		return new SharedGoal(
			sharedGoal.goal_id,
			sharedGoal.share_record_id,
			sharedGoal.goal_title,
			sharedGoal.goal_owner_id,
			sharedGoal.goal_owner_email,
			sharedGoal.share_status,
			sharedGoal.shared_with,
			sharedGoal.shared_on
		);
	}
}
