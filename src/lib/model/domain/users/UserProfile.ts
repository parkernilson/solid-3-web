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
        // TODO: Make this work in production
        return "http://127.0.0.1:54321/storage/v1/object/sign/profile_pictures/default/default-user.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm9maWxlX3BpY3R1cmVzL2RlZmF1bHQvZGVmYXVsdC11c2VyLnBuZyIsImlhdCI6MTczODYyOTAxNiwiZXhwIjoxNzQxMjIxMDE2fQ.xT14GSCfQbB2fdjEEMZ6rQ_nZC9hEvoOFX_0Jh_cGYI&t=2025-02-04T00%3A30%3A16.663Z";
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
