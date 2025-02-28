import { Entry, type IEntry } from "$lib/model/domain/goals";

export class EntrySquarePresenter {
    public entry: Entry;
    public showModal = $state(false);

    private formatter = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
		year: "2-digit"
    });

    public get dateFormatted() {
        return this.formatter.format(this.entry.dateOfObject)
    }

    constructor(entry: IEntry) {
        this.entry = Entry.fromJson(entry);
    }
}