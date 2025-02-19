import type { IEntry } from "$lib/model/domain/goals";
import type { GoalService } from "$lib/services/GoalService.svelte";
import { DataModel } from "../base/DataModel.svelte";

export class EntryDataModel extends DataModel<IEntry> {
    constructor(private goalService: GoalService, entryId: string, initialData?: IEntry) {
        super(entryId, initialData);
    }
    protected sendUpdate(): Promise<IEntry> {
        throw new Error("Method not implemented.");
    }
    sendLoad(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}