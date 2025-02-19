export abstract class BaseModel {
    public loading = $state<boolean>(false);

    protected abstract sendLoad(): Promise<void>;
    async load() {
        this.loading = true;
        try {
            await this.sendLoad();
        } finally {
            this.loading = false;
        }
    }
}