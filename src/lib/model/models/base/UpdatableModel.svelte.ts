import { BaseModel } from './BaseModel.svelte';
import type { ExecuteUpdateParams, UpdateRunner } from './update-runners';

export abstract class UpdatableModel extends BaseModel {
	public get updating() {
		return this.updateRunner.updating;
	}

	constructor(private updateRunner: UpdateRunner) {
		super();
	}

	protected async update(params: ExecuteUpdateParams): Promise<void> {
		await this.updateRunner.executeUpdate(params);
	}
}
