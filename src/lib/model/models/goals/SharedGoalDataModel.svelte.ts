import type { ISharedGoalInfo } from "$lib/model/domain/goals/SharedGoalInfo";
import { DataModel } from "../base/DataModel.svelte";

export class SharedGoalDataModel extends DataModel<ISharedGoalInfo> {
    protected sendUpdate(): Promise<ISharedGoalInfo> {
        throw new Error("Method not implemented.");
    }
    load(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}