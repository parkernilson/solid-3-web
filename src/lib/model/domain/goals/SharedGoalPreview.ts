import type { ShareStatus } from "./ShareRecord";

export interface ISharedGoalPreview {
	id: string;
	goalId: string;
	shareRecordId: number;
	goalTitle: string;
	goalOwnerId: string;
	goalOwnerEmail: string;
	goalOwnerProfileImagePath?: string;
	shareStatus: ShareStatus;
	sharedWith: string;
	sharedOn: string;
}

export class SharedGoalPreview implements ISharedGoalPreview {
	get sharedOnDate() {
		return new Date(this.sharedOn);
	}

	constructor(
		public id: string,
		public goalId: string,
		public shareRecordId: number,
		public goalTitle: string,
		public goalOwnerId: string,
		public goalOwnerEmail: string,
		public shareStatus: ShareStatus,
		public sharedWith: string,
		public sharedOn: string,
		public goalOwnerProfileImagePath?: string
	){}

	toJson(): ISharedGoalPreview {
		return {
			id: this.id,
			goalId: this.goalId,
			shareRecordId: this.shareRecordId,
			goalTitle: this.goalTitle,
			goalOwnerId: this.goalOwnerId,
			goalOwnerEmail: this.goalOwnerEmail,
			shareStatus: this.shareStatus,
			sharedWith: this.sharedWith,
			sharedOn: this.sharedOn,
			goalOwnerProfileImagePath: this.goalOwnerProfileImagePath
		}
	}

	static fromJson(json: ISharedGoalPreview): SharedGoalPreview {
		return new SharedGoalPreview(
			json.id,
			json.goalId,
			json.shareRecordId,
			json.goalTitle,
			json.goalOwnerId,
			json.goalOwnerEmail,
			json.shareStatus,
			json.sharedWith,
			json.sharedOn,
			json.goalOwnerProfileImagePath
		);
	}
}
