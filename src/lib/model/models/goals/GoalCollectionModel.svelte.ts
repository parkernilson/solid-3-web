import type { ModelFactory } from "$lib/factories/models/ModelFactory.svelte";
import type { GoalService } from "$lib/services/GoalService.svelte";
import { type IGoalInfo } from "../../domain/goals";
import { ListCollectionModel } from "../base/ListCollectionModel.svelte";
import type { ListDataStructure } from "../base/ListDataStructure.svelte";
import { GoalInfoDataModel } from "./GoalInfoDataModel.svelte";

export class GoalCollectionModel extends ListCollectionModel<IGoalInfo, GoalInfoDataModel> {
    constructor(
        private goalService: GoalService,
        private modelFactory: ModelFactory,
        dataStructure: ListDataStructure<GoalInfoDataModel>,
        private userId: string
    ) {
        super(dataStructure, (data) => data.id);
    }

    protected loadData(): Promise<IGoalInfo[]> {
        return this.goalService.listGoalInfos(this.userId);
    }

    protected makeConstituentDataModel(data: IGoalInfo): GoalInfoDataModel {
        return this.modelFactory.createGoalInfoDataModel(data.id, data);
    }

    protected async sendCreate(data: IGoalInfo): Promise<IGoalInfo> {
        const createdGoal = await this.goalService.createGoal({ title: data.title });
        const goalInfo = await this.goalService.getGoalInfo(createdGoal.id);
        return goalInfo;
    }

    async createGoal(title: string): Promise<void> {
        // TODO: use the create runner
        // const optimisticGoal = GoalInfo.createOptimisticJson(this.userId, new Date(), title);
        // await this.optimisticCreate(optimisticGoal);

        throw new Error("TODO: Not implemented " + title);
    }

    protected sendDelete(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}