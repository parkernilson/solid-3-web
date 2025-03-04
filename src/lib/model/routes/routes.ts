export class Routes {
	static getGoalsPageUrl() {
		return '/goals';
	}

	static getGoalPageUrl(goalId: string, shared: boolean) {
		return `/goals/${goalId}` + (shared ? '?shared=true' : '');
	}

	static getAddEntryUrl(goalId: string) {
		return `/goals/${goalId}/add-entry`;
	}

	static getViewEntryUrl(goalId: string, entryId: string) {
		return `/goals/${goalId}/entry/${entryId}`;
	}
}
