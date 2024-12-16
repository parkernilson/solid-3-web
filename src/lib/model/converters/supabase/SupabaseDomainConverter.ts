import type { SupabaseEntry } from '$lib/model/db/supabase/SupabaseEntry';
import type { SupabaseGoal } from '$lib/model/db/supabase/SupabaseGoal';
import type { SupabaseSharedGoal } from '$lib/model/db/supabase/SupabaseSharedGoal';
import type {
	SupabaseCurrentStreakInfo,
	SupabaseStreakInfo
} from '$lib/model/db/supabase/SupabaseStreakInfo';
import type { SupabaseUserProfile } from '$lib/model/db/supabase/SupabaseUserProfile';
import { CurrentStreakInfo, Entry, Goal, StreakInfo, UserProfile } from '$lib/model/domain/goals';
import { ShareRecord } from '$lib/model/domain/goals/ShareRecord';

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
		sharedGoal: SupabaseSharedGoal
	): ShareRecord {
		return new ShareRecord(
			this.convertUserProfile(userProfile),
			sharedGoal.goal,
			sharedGoal.status,
			sharedGoal.created_at
		)
	}
}
