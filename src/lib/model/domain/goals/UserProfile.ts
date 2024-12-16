export class UserProfile {
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
        email: string
    ) {
        this._id = id;
        this._email = email;
    }
}
