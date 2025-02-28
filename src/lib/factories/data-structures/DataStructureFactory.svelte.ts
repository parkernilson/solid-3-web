import { Entry } from '$lib/model/domain/goals';
import { SortedListDataStructure } from '$lib/model/models/base/data-structures';
import { UnsortedListDataStructure } from '$lib/model/models/base/data-structures/UnsortedListDataStructure.svelte';
import type { EntryDataModel } from '$lib/model/models/goals/EntryDataModel.svelte';
import type { GoalInfoDataModel } from '$lib/model/models/goals/GoalInfoDataModel.svelte';
import type { SharedGoalInfoDataModel } from '$lib/model/models/goals/SharedGoalInfoDataModel.svelte';
import type { SharedGoalPreviewDataModel } from '$lib/model/models/goals/SharedGoalPreviewDataModel.svelte';
import { compareNullable } from '$lib/utils/compare';

export class DataStructureFactory {
	createGoalCollectionModelDataStructure(): UnsortedListDataStructure<GoalInfoDataModel> {
		return new UnsortedListDataStructure<GoalInfoDataModel>((m) => m.id);
	}

	createSharedGoalCollectionModelDataStructure(): UnsortedListDataStructure<SharedGoalInfoDataModel> {
		return new UnsortedListDataStructure<SharedGoalInfoDataModel>((m) => m.id);
	}

	createSharedGoalPreviewCollectionModelDataStructure(): UnsortedListDataStructure<SharedGoalPreviewDataModel> {
		return new UnsortedListDataStructure<SharedGoalPreviewDataModel>((m) => m.id);
	}

	createEntryCollectionModelDataStructure(): SortedListDataStructure<EntryDataModel> {
		return new SortedListDataStructure<EntryDataModel>(
			(m) => m.id,
			(a, b) => -compareNullable(Entry.compareByDate)(a.data, b.data)
		);
	}
}
