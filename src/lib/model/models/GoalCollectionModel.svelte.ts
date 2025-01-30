import type { GoalService } from "$lib/services/GoalService.svelte";
import { GoalInfo, type IGoalInfo } from "../domain/goals";
import { GoalModel } from "./GoalModel.svelte";
import { ListCollectionModel } from "./base/ListCollectionModel.svelte";

export class GoalCollectionModel extends ListCollectionModel<IGoalInfo> {
    constructor(
        private goalService: GoalService,
        private userId: string
    ) {
        super();
    }

    async load(): Promise<void> {
        const goalInfos = await this.goalService.listGoalInfos(this.userId);
        this.setItems(goalInfos);
    }

    protected makeConstituentDataModel(data: IGoalInfo): GoalModel {
        return new GoalModel(this.goalService, data.id, data);
    }

    protected async sendCreate(data: IGoalInfo): Promise<IGoalInfo> {
        const createdGoal = await this.goalService.createGoal({ title: data.title });
        const goalInfo = await this.goalService.getGoalInfo(createdGoal.id);
        return goalInfo;
    }

    async createGoal(title: string): Promise<void> {
        const optimisticGoal = GoalInfo.createOptimisticJson(this.userId, new Date(), title);
        await this.optimisticCreate(optimisticGoal);
    }

    protected sendDelete(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}