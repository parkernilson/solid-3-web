import { DateEx } from '$lib/utils/dates';

export class HeaderStatsPresenter {
	private get startDateObj() {
		return DateEx.fromISODateOnly(this.startDate);
	}

	private formatter = new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: 'numeric',
		year: '2-digit'
	});

	get startDateFormatted() {
		return this.formatter.format(this.startDateObj);
	}

	constructor(
		public streak: number,
		public record: number,
		private startDate: string
	) {}
}
