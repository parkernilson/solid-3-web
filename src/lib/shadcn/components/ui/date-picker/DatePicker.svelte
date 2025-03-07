<script lang="ts">
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import { type DateValue, DateFormatter, getLocalTimeZone } from '@internationalized/date';
	import { cn } from '$lib/shadcn/utils';
	import { Button } from '$lib/shadcn/components/ui/button';
	import { Calendar } from '$lib/shadcn/components/ui/calendar';
	import * as Popover from '$lib/shadcn/components/ui/popover';

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	let value = $state<DateValue>();
</script>

<Popover.Root>
	<Popover.Trigger>
		{#snippet child({ props })}
			<Button
				variant="outline"
				class={cn(
					'w-[280px] justify-start text-left font-normal',
					!value && 'text-muted-foreground'
				)}
				{...props}
			>
				<CalendarIcon class="mr-2 size-4" />
				{value ? df.format(value.toDate(getLocalTimeZone())) : 'Select a date'}
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content class="w-auto p-0">
		<Calendar bind:value type="single" initialFocus />
	</Popover.Content>
</Popover.Root>
