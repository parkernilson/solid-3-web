export class Routes {
	static getGoalPageUrl(goalId: string, shared: boolean) {
		return `/goals/${goalId}` + (shared ? '?shared=true' : '');
	}

    static getAddEntryUrl(goalId: string) {
        return `/goals/${goalId}/add-entry`;
    }

    static getEditEntryUrl(goalId: string, entryId: string) {
        return `/goals/${goalId}/edit-entry/${entryId}`;
    }
}
