import type { ISharedGoal } from "../../domain/goals";
import { DataModel } from "../base/DataModel.svelte";

export class SharedGoalDataModel extends DataModel<ISharedGoal> {
    protected sendUpdate(): Promise<ISharedGoal> {
        throw new Error("Method not implemented.");
    }
    load(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}