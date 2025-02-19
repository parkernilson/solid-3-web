import type { ISharedGoalPreview, ShareStatus } from "../../domain/goals";
import { DataModel } from "../base/DataModel.svelte";

export class SharedGoalPreviewDataModel extends DataModel<ISharedGoalPreview> {
    
    markRequestStatus(status: ShareStatus): ShareStatus {
        if (!this.data) throw new Error("Tried to mark shared goal preview status, but there was no data.");
        const previousStatus = this.data.shareStatus;
        this.data.shareStatus = status;
        return previousStatus;
    }

    protected sendUpdate(): Promise<ISharedGoalPreview> {
        throw new Error("Method not implemented.");
    }
    sendLoad(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}