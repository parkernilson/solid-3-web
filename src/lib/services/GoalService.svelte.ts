import type { Database } from '$lib/supabase/database.types';
import { supabase } from '$lib/supabase/supabase';
import type { CamelCase } from '$lib/utils/types';
import { ErrorService } from './ErrorService.svelte';
import { SupabaseService } from './SupabaseService.svelte';

export type Goal = Database['public']['Tables']['goals']['Row'];
export type Entry = Database['public']['Tables']['entries']['Row'];

export class GoalService extends SupabaseService {
	static make(): GoalService {
		return new GoalService(supabase, ErrorService.instance());
	}

	async getGoal(goalId: string) {
		return this.supabase.from('goals').select('*').eq('id', goalId).maybeSingle();
	}

	async createGoal({ title }: CamelCase<Omit<Goal, 'id' | 'created_at' | 'owner'>>) {
		return this.supabase.rpc('create_goal', { _title: title });
	}

	async createEntry({ goal, textContent, success }: CamelCase<Omit<Entry, 'id' | 'created_at'>>) {
		return this.supabase.rpc('create_entry', {
			_goal_id: goal,
			_text_content: textContent ?? undefined,
			_success: success
		});
	}

	async shareGoal({
		goalId,
		withUser
	}: CamelCase<Database['public']['Functions']['share_goal']['Args']>) {
		return this.supabase.rpc('share_goal', { _goal_id: goalId, _with_user: withUser });
	}
    
    async acceptSharedGoal({
        goalId
    }: CamelCase<Database["public"]["Functions"]["accept_shared_goal"]["Args"]>) {
        return this.supabase.rpc('accept_shared_goal', { _goal_id: goalId })
    }
}
