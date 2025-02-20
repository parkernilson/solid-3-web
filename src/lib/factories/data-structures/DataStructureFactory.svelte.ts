import { ListDataStructure } from "$lib/model/models/base/ListDataStructure.svelte";
import type { EntryDataModel } from "$lib/model/models/goals/EntryDataModel.svelte";
import type { GoalInfoDataModel } from "$lib/model/models/goals/GoalInfoDataModel.svelte";
import type { SharedGoalInfoDataModel } from "$lib/model/models/goals/SharedGoalInfoDataModel.svelte";
import type { SharedGoalPreviewDataModel } from "$lib/model/models/goals/SharedGoalPreviewDataModel.svelte";

export class DataStructureFactory {
    createGoalCollectionModelDataStructure(): ListDataStructure<GoalInfoDataModel> {
        return new ListDataStructure<GoalInfoDataModel>(m => m.id);
    }

    createSharedGoalCollectionModelDataStructure(): ListDataStructure<SharedGoalInfoDataModel> {
        return new ListDataStructure<SharedGoalInfoDataModel>(m => m.id);
    }

    createSharedGoalPreviewCollectionModelDataStructure(): ListDataStructure<SharedGoalPreviewDataModel> {
        return new ListDataStructure<SharedGoalPreviewDataModel>(m => m.id);
    }

    createEntryCollectionModelDataStructure(): ListDataStructure<EntryDataModel> {
        return new ListDataStructure<EntryDataModel>(m => m.id);
    }
}