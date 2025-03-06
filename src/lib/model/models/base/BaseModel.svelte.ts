export abstract class BaseModel {
	private _loading = $state<boolean>(false);
	public get loading() {
		return this._loading;
	}
	private set loading(value: boolean) {
		this._loading = value;
	}

	private _loaded = $state<boolean>(false);
	/**
	 * True if the data has been successfully loaded. Until this is true, it
	 * is an error to access the data property.
	 * Note that this indicates that the data has been loaded _at least_ once.
	 */
	public get loaded(): boolean {
		return this._loaded;
	}
	protected set loaded(value: boolean) {
		this._loaded = value;
	}

	protected abstract sendLoad(): Promise<void>;
	/**
	 * If the model has not been loaded, load it.
	 */
	async load() {
		this.loading = true;
		try {
			if (!this.loaded) {
				await this.sendLoad();
			}
			this.loaded = true;
		} finally {
			this.loading = false;
		}
	}
}
