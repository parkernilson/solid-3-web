<script lang="ts">
	import * as AlertDialog from '$lib/shadcn/components/ui/alert-dialog';
	import type { Snippet } from 'svelte';

	const {
		children,
		title,
		description,
		onAction,
		actionName
	}: {
		children: Snippet;
		title: string;
		description: string;
		onAction: () => Promise<void>;
		actionName: string;
	} = $props();
</script>

<AlertDialog.Root>
	<AlertDialog.Trigger>{@render children()}</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>{title}</AlertDialog.Title>
			<AlertDialog.Description>{description}</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action onclick={onAction}>{actionName}</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
