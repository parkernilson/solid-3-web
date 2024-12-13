import { ErrorHandlingPresenter } from './ErrorHandlingPresenter';

export abstract class LoadablePresenter extends ErrorHandlingPresenter {
	private _loading = $state(true);

	get loading() {
		return this._loading;
	}
	private set loading(v) {
		this._loading = v;
	}

	async load() {
		await this.doErrorable({
			action: async () => {
				this.loading = true;
				await this.loadResource();
			},
			onFinally: () => {
				this.loading = false;
			}
		});
	}

	abstract loadResource(): Promise<void>;
}
