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

	private _loaded = $state(false);
	get loaded() {
		return this._loaded;
	}
	private set loaded(v) {
		this._loaded = v;
	}

	async load(args: LoadArgs) {
		await this.doErrorable({
			action: async () => {
				this.loading = true;
				await this.loadResource(args);
				this.loaded = true;
			},
			onFinally: () => {
				this.loading = false;
			}
		});
	}

	protected abstract loadResource(args: LoadArgs): Promise<void>;
}
