import type { ModelFactory } from "$lib/factories/models/ModelFactory.svelte";
import type { GoalService } from "$lib/services/GoalService.svelte";
import type { ISharedGoalPreview } from "../../domain/goals";
import type { UserProfile } from "../../domain/users";
import type { DataModel } from "../base/DataModel.svelte";
import { ListCollectionModel } from "../base/ListCollectionModel.svelte";

export class SharedGoalPreviewCollectionModel extends ListCollectionModel<ISharedGoalPreview> {
    constructor(
        private goalService: GoalService,
        private modelFactory: ModelFactory,
        private user: UserProfile
    ) {
        super();
    }

    async load(): Promise<void> {
        const sharedGoalPreviews = await this.goalService.listSharedGoalPreviewsWithUser(this.user);
        this.setItems(sharedGoalPreviews);
    }

    protected makeConstituentDataModel(data: ISharedGoalPreview): DataModel<ISharedGoalPreview> {
        return this.modelFactory.createSharedGoalPreviewDataModel(data);
    }

    protected sendCreate(): Promise<ISharedGoalPreview> {
        throw new Error("Cannot create shared goal preview.");
    }
    protected sendDelete(): Promise<void> {
        throw new Error("Cannot delete shared goal preview.");
    }
}