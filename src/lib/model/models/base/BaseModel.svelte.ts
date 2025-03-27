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
	 * is an error to access the data property. Note that this may also be true
	 * if the model is given data by some other means outside of the load method
	 * (for example, it may be instantiated with initial data)
	 * Note that this indicates that the data has been loaded _at least_ once.
	 */
	public get loaded(): boolean {
		return this._loaded;
	}
	protected set loaded(value: boolean) {
		this._loaded = value;
	}

	private loadsInFlight = 0;

	protected abstract sendLoad(): Promise<void>;

	/**
	 * If the model has not been loaded, load it.
	 */
	async load() {
		if (!this.loaded) {
			await this.executeLoad(this.sendLoad.bind(this));
		}
	}

	/**
	 * Reload the data by calling the sendLoad method.
	 * NOTE: The difference between this and load is that this will always
	 * reload the data, even if it has already been loaded. It will not affect
	 * the this.loaded property, only the this.loading property.
	 */
	async reload() {
		await this.executeLoad(this.sendLoad.bind(this));
	}

	/**
	 * @param send The function to call to send the load request. This could be used to provide
	 * a custom loading function, like for example, an optional reload function which differs from
	 * the default sendLoad method. However, there is no reason to support that at this time
	 * (as of 2024-03-07)
	 */
	async executeLoad(send: () => Promise<void>) {
		this.loading = true;
		this.loadsInFlight++;
		try {
			await send();
			this.loaded = true;
		} finally {
			if (--this.loadsInFlight === 0) {
				this.loading = false;
			}
		}
	}
}
