import { UserProfile, type IUserProfile } from '../users/UserProfile';

export interface IShareRecord {
    user: IUserProfile;
    goalId: string;
    status: 'pending' | 'accepted' | 'rejected';
    sharedOn: Date | string;
}

export class ShareRecord implements IShareRecord {
    private _user: UserProfile;
    private _goalId: string;
    private _status: 'pending' | 'accepted' | 'rejected';
    private _sharedOn: Date | string;

    get user(): UserProfile {
        return this._user;
    }
    get goalId(): string {
        return this._goalId;
    }
    get status(): 'pending' | 'accepted' | 'rejected' {
        return this._status;
    }
    private set status(s) {
        this._status = s;
    }
    get sharedOn(): Date {
        return new Date(this._sharedOn);
    }

	constructor(
		user: UserProfile,
		goalId: string,
		status: 'pending' | 'accepted' | 'rejected',
		sharedOn: Date | string
	) {
        this._user = user;
        this._goalId = goalId;
        this._status = status;
        this._sharedOn = sharedOn;
    }

    toJson(): IShareRecord {
        return {
            user: this.user.toJson(),
            goalId: this.goalId,
            status: this.status,
            sharedOn: this.sharedOn
        }
    }

    static fromJson(json: IShareRecord) {
        return new ShareRecord(
            UserProfile.fromJson(json.user),
            json.goalId,
            json.status,
            json.sharedOn
        )
    }
}
