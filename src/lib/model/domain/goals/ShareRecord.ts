import type { UserProfile } from './UserProfile';

export class ShareRecord {
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
}
