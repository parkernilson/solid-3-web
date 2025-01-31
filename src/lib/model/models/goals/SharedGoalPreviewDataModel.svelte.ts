import type { ISharedGoalPreview } from "../../domain/goals";
import { DataModel } from "../base/DataModel.svelte";

export class SharedGoalPreviewDataModel extends DataModel<ISharedGoalPreview> {
    protected sendUpdate(): Promise<ISharedGoalPreview> {
        throw new Error("Method not implemented.");
    }
    load(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}