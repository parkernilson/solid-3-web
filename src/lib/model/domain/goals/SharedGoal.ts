import type { ShareStatus } from "./ShareRecord";

export interface ISharedGoalBase {
	goalId: string;
	shareRecordId: number;
	goalTitle: string;
	goalOwnerId: string;
	goalOwnerEmail: string;
	shareStatus: ShareStatus;
	sharedWith: string;
}

export interface ISharedGoal extends ISharedGoalBase {
	sharedOn: Date;
}

export interface SharedGoalDto extends ISharedGoalBase {
	sharedOn: string;
}

export class SharedGoal implements ISharedGoal {
	private _goalId: string;
	private _shareRecordId: number;
	private _goalTitle: string;
	private _goalOwnerId: string;
	private _goalOwnerEmail: string;
	private _shareStatus: ShareStatus;
	private _sharedWith: string;
	private _sharedOn: string;

	get goalId(): string {
		return this._goalId;
	}
	get shareRecordId(): number {
		return this._shareRecordId;
	}
	get goalTitle(): string {
		return this._goalTitle;
	}
	get goalOwnerId(): string {
		return this._goalOwnerId;
	}
    get goalOwnerEmail(): string {
        return this._goalOwnerEmail;
    }
	get shareStatus(): ShareStatus {
		return this._shareStatus;
	}
	get sharedWith(): string {
		return this._sharedWith;
	}
	get sharedOn(): Date {
		return new Date(this._sharedOn);
	}

	constructor(
		goalId: string,
		shareRecordId: number,
		goalTitle: string,
		goalOwnerId: string,
		goalOwnerEmail: string,
		shareStatus: ShareStatus,
		sharedWith: string,
		sharedOn: string
	) {
		this._goalId = goalId;
		this._shareRecordId = shareRecordId;
		this._goalTitle = goalTitle;
		this._goalOwnerId = goalOwnerId;
        this._goalOwnerEmail = goalOwnerEmail;
		this._shareStatus = shareStatus;
		this._sharedWith = sharedWith;
		this._sharedOn = sharedOn;
	}

	toJson(): SharedGoalDto {
		return {
			goalId: this.goalId,
			shareRecordId: this.shareRecordId,
			goalTitle: this.goalTitle,
			goalOwnerId: this.goalOwnerId,
			goalOwnerEmail: this.goalOwnerEmail,
			shareStatus: this.shareStatus,
			sharedWith: this.sharedWith,
			sharedOn: this.sharedOn.toISOString()
		}
	}

	static fromJson(dto: SharedGoalDto): SharedGoal {
		return new SharedGoal(
			dto.goalId,
			dto.shareRecordId,
			dto.goalTitle,
			dto.goalOwnerId,
			dto.goalOwnerEmail,
			dto.shareStatus,
			dto.sharedWith,
			dto.sharedOn
		);
	}
}
