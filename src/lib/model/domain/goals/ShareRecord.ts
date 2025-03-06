import { DateEx } from '$lib/utils/dates';
import { type IUserProfile } from '../users/UserProfile';

export type ShareStatus = 'pending' | 'accepted' | 'rejected';

export interface IShareRecord {
	user: IUserProfile;
	goalId: string;
	status: ShareStatus;
	sharedOn: string;
}

export class ShareRecord implements IShareRecord {
	get sharedOnDate(): DateEx {
		return DateEx.fromISODateOnly(this.sharedOn);
	}

	constructor(
		public user: IUserProfile,
		public goalId: string,
		public status: ShareStatus,
		public sharedOn: string
	) {}

	toJson(): IShareRecord {
		return {
			user: this.user,
			goalId: this.goalId,
			status: this.status,
			sharedOn: this.sharedOn
		};
	}

	static fromJson(json: IShareRecord) {
		return new ShareRecord(json.user, json.goalId, json.status, json.sharedOn);
	}
}
