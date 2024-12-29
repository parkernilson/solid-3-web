import { ErrorHandler } from '../utils/ErrorHandler';

export abstract class LoadablePresenter<
	LoadArgs extends Record<string, unknown> = Record<string, never>
> extends ErrorHandler {
	private _loading = $state(true);

	get loading() {
		return this._loading;
	}
	private set loading(v) {
		this._loading = v;
	}

	async load(args: LoadArgs) {
		await this.doErrorable({
			action: async () => {
				this.loading = true;
				await this.loadResource(args);
			},
			onFinally: () => {
				this.loading = false;
			}
		});
	}

	protected abstract loadResource(args: LoadArgs): Promise<void>;
}
