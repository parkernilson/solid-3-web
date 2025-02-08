import type { IGoal } from "./Goal";

export interface ISharedGoal extends IGoal {
    ownerEmail: string;
    ownerProfileImagePath?: string;
    sharedOn: string;
}