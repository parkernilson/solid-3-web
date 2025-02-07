export interface IUserProfile {
    id: string;
    email: string;
    profileImageUrl?: string;
}

export class UserProfile implements IUserProfile {
    private _id: string;
    private _email: string;

    get id(): string {
        return this._id;
    }
    get email(): string {
        return this._email;
    }

    constructor(
        id: string,
        email: string,
        public profileImageUrl?: string
    ) {
        this._id = id;
        this._email = email;
    }

    static defaultProfileImageUrl(): string {
        return "/default-user.png";
    }

    toJson(): IUserProfile {
        return {
            id: this.id,
            email: this.email,
            profileImageUrl: this.profileImageUrl
        }
    }

    static fromJson(json: IUserProfile) {
        return new UserProfile(
            json.id,
            json.email,
            json.profileImageUrl
        )
    }
}
