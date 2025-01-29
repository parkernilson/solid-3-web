import type { GoalService } from "$lib/services/GoalService.svelte";
import type { GoalInfo } from "../domain/goals";

export class GoalCollectionModel {
    private _goals = $state<GoalInfo[]>();
    get goals() {
        return this._goals;
    }
    private set goals(g) {
        this._goals = g;
    }
    constructor(
        private goalService: GoalService,
    ) {}
    async loadGoals(userId: string) {
        this.goals = await this.goalService.listGoalInfos(userId);
    }
}