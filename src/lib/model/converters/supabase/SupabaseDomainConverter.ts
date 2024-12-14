import type { SupabaseEntry } from '$lib/model/db/supabase/SupabaseEntry';
import type { SupabaseGoal } from '$lib/model/db/supabase/SupabaseGoal';
import type {
	SupabaseCurrentStreakInfo,
	SupabaseStreakInfo
} from '$lib/model/db/supabase/SupabaseStreakInfo';
import { CurrentStreakInfo, Entry, Goal, StreakInfo } from '$lib/model/domain/goals';

export class SupabaseDomainConverter {
	convertGoal(goal: SupabaseGoal): Goal {
		return new Goal(goal.id, goal.owner, goal.title, goal.created_at);
	}

    convertEntry(entry: SupabaseEntry): Entry {
        return new Entry(
            entry.id,
            entry.goal,
            entry.text_content,
            entry.date_of,
            entry.success
        );
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
}
