import type { Entry } from "$lib/model/goals";
import { ErrorService } from "$lib/services/ErrorService.svelte";
import { GoalService } from "$lib/services/GoalService.svelte";
import type { PaginatedRequest } from "$lib/utils/types/pagination/PaginatedRequest";
import { GoalServicePresenter } from "./GoalServicePresenter.svelte";

export class EntryGalleryPresenter extends GoalServicePresenter {
    private _entries = $state<Entry[]>([]);
    private _hasMoreEntries = $state(true);
    private _loadingMoreEntries = $state(false);

    get entries() { return this._entries }
    private set entries(e) { this._entries = e }
    get hasMoreEntries() { return this._hasMoreEntries }
    private set hasMoreEntries(h) { this._hasMoreEntries = h }
    get loadingMoreEntries() { return this._loadingMoreEntries }
    private set loadingMoreEntries(l) { this._loadingMoreEntries = l }

    constructor(private goalId: string, goalService: GoalService, errorService: ErrorService) {
        super(errorService, goalService);
    }

    static make(goalId: string) {
        return new EntryGalleryPresenter(goalId, GoalService.make(), ErrorService.instance());
    }

    async loadMoreEntries() {
        if (!this.hasMoreEntries || this.loading) return;
        const lastEntry = this.entries?.[this.entries.length - 1];
        await this.loadEntries({ pageSize: 12, exclusiveStartKey: lastEntry?.date_of })
    }

    async loadEntries({ pageSize, exclusiveStartKey }: PaginatedRequest): Promise<void> {
        try {
            this.loadingMoreEntries = true

            const { data: entriesData, hasMore } = await this.goalService.getEntriesPaginated(
                this.goalId,
                {
                    pageSize, exclusiveStartKey
                }
            )

            this.entries = [...(this.entries ?? []), ...entriesData]
            this.hasMoreEntries = hasMore
        } catch(e) {
            this.errorService.reportError(e)
        } finally {
            this.loadingMoreEntries = false
        }

    }

    async loadResource(): Promise<void> {
        await this.loadEntries({ pageSize: 10, exclusiveStartKey: null })
    }

    async updateEntry(entry: Entry) {
        const updatedEntries = this.entries.map(e => e.id === entry.id ? entry : e)
        this.entries = updatedEntries
    }
}