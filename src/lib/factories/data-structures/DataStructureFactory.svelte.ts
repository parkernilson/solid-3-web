import { ListDataStructure } from "$lib/model/models/base/ListDataStructure.svelte";
import type { EntryDataModel } from "$lib/model/models/goals/EntryDataModel.svelte";
import type { GoalDataModel } from "$lib/model/models/goals/GoalDataModel.svelte";
import type { SharedGoalDataModel } from "$lib/model/models/goals/SharedGoalDataModel.svelte";
import type { SharedGoalPreviewDataModel } from "$lib/model/models/goals/SharedGoalPreviewDataModel.svelte";

export class DataStructureFactory {
    createGoalCollectionModelDataStructure(): ListDataStructure<GoalDataModel> {
        return new ListDataStructure<GoalDataModel>(m => m.id);
    }

    createSharedGoalCollectionModelDataStructure(): ListDataStructure<SharedGoalDataModel> {
        return new ListDataStructure<SharedGoalDataModel>(m => m.id);
    }

    createSharedGoalPreviewCollectionModelDataStructure(): ListDataStructure<SharedGoalPreviewDataModel> {
        return new ListDataStructure<SharedGoalPreviewDataModel>(m => m.id);
    }

    createEntryCollectionModelDataStructure(): ListDataStructure<EntryDataModel> {
        return new ListDataStructure<EntryDataModel>(m => m.id);
    }
}