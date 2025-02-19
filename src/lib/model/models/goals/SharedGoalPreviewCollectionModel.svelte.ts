import type { ModelFactory } from "$lib/factories/models/ModelFactory.svelte";
import type { GoalService } from "$lib/services/GoalService.svelte";
import type { ISharedGoalPreview, ShareStatus } from "../../domain/goals";
import type { UserProfile } from "../../domain/users";
import { ListCollectionModel } from "../base/ListCollectionModel.svelte";
import type { ListDataStructure } from "../base/ListDataStructure.svelte";
import type { SharedGoalPreviewDataModel } from "./SharedGoalPreviewDataModel.svelte";

export class SharedGoalPreviewCollectionModel extends ListCollectionModel<ISharedGoalPreview, SharedGoalPreviewDataModel> {
    constructor(
        private goalService: GoalService,
        private modelFactory: ModelFactory,
        dataStructure: ListDataStructure<SharedGoalPreviewDataModel>,
        private user: UserProfile
    ) {
        super(dataStructure);
    }

    async sendLoad(): Promise<void> {
        const sharedGoalPreviews = await this.goalService.listSharedGoalPreviewsWithUser(this.user);
        this.setItems(sharedGoalPreviews);
    }

    protected makeConstituentDataModel(data: ISharedGoalPreview): SharedGoalPreviewDataModel {
        return this.modelFactory.createSharedGoalPreviewDataModel(data);
    }

    markRequestStatus(goalId: string, status: ShareStatus): ShareStatus {
        const goal = this.getModel(goalId);
        if (!goal) throw new Error("Tried to mark shared goal preview as accepted, but it was not found.");
        return goal.markRequestStatus(status);
    }

    protected sendCreate(): Promise<ISharedGoalPreview> {
        throw new Error("Cannot create shared goal preview.");
    }
    protected sendDelete(): Promise<void> {
        throw new Error("Cannot delete shared goal preview.");
    }
}