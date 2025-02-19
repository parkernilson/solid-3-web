import type { ModelFactory } from "$lib/factories/models/ModelFactory.svelte";
import type { IGoalInfo } from "$lib/model/domain/goals";
import { BaseModel } from "../base/BaseModel.svelte";
import type { EntryCollectionModel } from "./EntryCollectionModel.svelte";
import type { GoalDataModel } from "./GoalDataModel.svelte";

// TODO: Finish this class
export class GoalModel extends BaseModel {
    private goalDataModel: GoalDataModel;
    private entryCollectionModel: EntryCollectionModel;

    constructor(modelFactory: ModelFactory, private goalId: string, initialGoalInfo?: IGoalInfo) {
        super();
        this.goalDataModel = modelFactory.createGoalModel(goalId, initialGoalInfo);
        this.entryCollectionModel = modelFactory.createEntryCollectionModel(goalId);
    }

    sendLoad(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}