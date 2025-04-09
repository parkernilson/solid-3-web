<script lang="ts">
	import * as AlertDialog from '$lib/shadcn/components/ui/alert-dialog';
</script>

<div class="h-full">
	<div class="w-full h-32 bg-red-300"></div>
	<AlertDialog.Root>
		<AlertDialog.Trigger>Open</AlertDialog.Trigger>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
				<AlertDialog.Description>
					This action cannot be undone. This will permanently delete your account and remove your
					data from our servers.
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
				<AlertDialog.Action onclick={() => console.log('hey')}>Continue</AlertDialog.Action>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
</div>
