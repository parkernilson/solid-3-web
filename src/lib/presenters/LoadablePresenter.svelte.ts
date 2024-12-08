import { ErrorablePresenter } from "./ServicePresenter.svelte";

export abstract class LoadablePresenter extends ErrorablePresenter {

    private _loading = $state(true);

    get loading() { return this._loading }
    private set loading(v) { this._loading = v }

    async load() {
        try {
            this.loading = true
            await this.loadResource()
        } catch(e) {
            this.errorService.reportError(e)
        } finally {
            this.loading = false
        }
    }

    abstract loadResource(): Promise<void>;

}