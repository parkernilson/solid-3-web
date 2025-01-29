import type { GoalService } from "$lib/services/GoalService.svelte";
import type { IGoalInfo } from "../domain/goals";
import type { IdType } from "../domain/Id";
import { CollectionModel } from "./CollectionModel.svelte";
import type { DataModel } from "./DataModel.svelte";
import { GoalModel } from "./GoalModel.svelte";

export class GoalCollectionModel extends CollectionModel<IGoalInfo> {
    public goalModels = $state<GoalModel[]>();

    constructor(
        private goalService: GoalService,
        private userId: string
    ) {
        super();
    }

    async load(): Promise<void> {
        // TODO: use this.goalService.listGoalInfos(userId) to load goals
        const goalInfos = await this.goalService.listGoalInfos(this.userId);
        this.setItems(goalInfos);
    }

    protected makeConstituentDataModel(data: IGoalInfo): GoalModel {
        // TODO: should this be constructed by the model factory?
        return new GoalModel(this.goalService, data.id, data);
    }

    protected sendCreate(data: Omit<IGoalInfo, "id">): Promise<IGoalInfo> {
        throw new Error("Method not implemented.");
    }
    protected sendDelete(id: IdType): Promise<void> {
        throw new Error("Method not implemented.");
    }
    protected get(id: IdType): DataModel<IGoalInfo> | undefined {
        throw new Error("Method not implemented.");
    }
    protected add(data: IGoalInfo): void {
        throw new Error("Method not implemented.");
    }
    protected setItems(data: IGoalInfo[]): void {
        this.goalModels = data.map(this.makeConstituentDataModel.bind(this));
    }
    protected remove(id: IdType): void {
        throw new Error("Method not implemented.");
    }
    protected update(id: IdType, data: IGoalInfo): void {
        throw new Error("Method not implemented.");
    }
}