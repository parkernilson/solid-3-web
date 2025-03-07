<script lang="ts">
	import { PresenterFactory } from '$lib/factories/presenters/PresenterFactory.svelte';
	import { getContext } from 'svelte';

	const { streak, record, startDate }: { streak: number; record: number; startDate: string } =
		$props();

	const presenterFactory = getContext<PresenterFactory>('PresenterFactory');
	// Note: If using state variables to construct the presenter, instead of models, need to derive the presenter
	const presenter = $derived(
		presenterFactory.createHeaderStatsPresenter(streak, record, startDate)
	);
</script>

<div class="flex items-center">
	<div class="flex-1 flex flex-col items-center">
		<p class="text-3xl">{presenter.streak}</p>
		<p>Streak</p>
	</div>
	<div class="border-white border-r border-1 h-12"></div>
	<div class="flex-1 flex flex-col items-center">
		<p class="text-3xl">{presenter.record}</p>
		<p>Record</p>
	</div>
	<div class="border-white border-r border-1 h-12"></div>
	<div class="flex-1 flex flex-col justify-end items-center">
		<p class="text-xl xs:text-2xl">{presenter.startDateFormatted}</p>
		<p>Started</p>
	</div>
</div>
