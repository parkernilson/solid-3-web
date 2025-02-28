import type { ModelFactory } from '$lib/factories/models/ModelFactory.svelte';
import type { GoalService } from '$lib/services/GoalService.svelte';
import { Goal, type GoalCreateParams, type IGoalInfo } from '../../domain/goals';
import type { CreateDeleteRunnerConstructor } from '../base/create-delete-runners';
import type { UnsortedListDataStructure } from '../base/data-structures/UnsortedListDataStructure.svelte';
import { ListCollectionModel } from '../base/ListCollectionModel.svelte';
import { GoalInfoDataModel } from './GoalInfoDataModel.svelte';

type GoalCollectionCDRunnerConstructor = CreateDeleteRunnerConstructor<
	IGoalInfo,
	GoalCreateParams,
	GoalInfoDataModel
>;

export class GoalCollectionModel extends ListCollectionModel<
	IGoalInfo,
	GoalCreateParams,
	GoalInfoDataModel
> {
	constructor(
		private goalService: GoalService,
		private modelFactory: ModelFactory,
		dataStructure: UnsortedListDataStructure<GoalInfoDataModel>,
		cdRunnerConstructor: GoalCollectionCDRunnerConstructor,
		private userId: string
	) {
		super(dataStructure, (data) => data.id, undefined, cdRunnerConstructor);
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
		const createParams = Goal.createOptimistic({ owner: this.userId, title });

		await this.create({
			createParams,
			optimistic: true,
			sendCreate: async (createParams) => {
				const { id } = await this.goalService.createGoal(createParams);
				return this.goalService.getGoalInfo(id);
			}
		});
	}

	protected sendDelete(): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
