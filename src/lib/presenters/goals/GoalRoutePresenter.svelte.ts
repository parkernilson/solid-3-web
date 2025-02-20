import type { IGoalInfo, ISharedGoalInfo } from '$lib/model/domain/goals';
import { GoalModel } from '$lib/model/models/goals/GoalModel.svelte';
import type { ErrorService } from '$lib/services/ErrorService.svelte';
import { LoadablePresenter } from '../LoadablePresenter.svelte';

export class GoalRoutePresenter extends LoadablePresenter {
	private _goalModel = $state<GoalModel>()!;

	private _goalInfo: IGoalInfo | ISharedGoalInfo | undefined = $derived(
		this._goalModel.goalData && this._goalModel.goalStats
			? {
					...this._goalModel.goalData,
					...this._goalModel.goalStats
				}
			: undefined
	);

	get goalInfo() {
		return this._goalInfo;
	}

	constructor(
		errorService: ErrorService,
		private goalModel: GoalModel
	) {
		super(errorService);
		this._goalModel = goalModel;
	}

	protected async loadResource(): Promise<void> {
		await this.goalModel.load();
	}
}
