<script lang="ts">
	let { isOpen = $bindable<boolean>(), children } = $props();

	function closeModal() {
		isOpen = false;
	}

	// Handle escape key press
	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			closeModal();
		}
	}

	// Clean up event listener
	import { onMount, onDestroy } from 'svelte';

	onMount(() => {
		window.addEventListener('keydown', handleKeydown);
	});

	onDestroy(() => {
		window.removeEventListener('keydown', handleKeydown);
	});
</script>

<div
	class="relative z-50"
	class:hidden={!isOpen}
	aria-labelledby="slide-over-title"
	role="dialog"
	aria-modal="true"
>
	<!-- Background overlay -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
		class:opacity-0={!isOpen}
		class:opacity-100={isOpen}
		onclick={closeModal}
	></div>

	<div class="fixed inset-0 overflow-hidden">
		<div class="absolute inset-0 overflow-hidden">
			<div class="pointer-events-none fixed inset-y-0 bottom-0 flex max-h-[80vh] w-full">
				<!-- Slide-over panel -->
				<div
					class="pointer-events-auto w-full transform transition ease-in-out duration-500"
					class:translate-y-full={!isOpen}
					class:translate-y-0={isOpen}
				>
					<div class="flex h-full flex-col overflow-y-auto bg-white shadow-xl">
						<!-- Header -->
						<div class="px-4 py-6 sm:px-6">
							<div class="flex items-center justify-between">
								<h2 class="text-base font-semibold leading-6 text-gray-900" id="slide-over-title">
									Modal Title
								</h2>
								<div class="ml-3 flex h-7 items-center">
									<button
										type="button"
										class="rounded-md bg-white text-gray-400 hover:text-gray-500"
										onclick={closeModal}
									>
										<span class="sr-only">Close panel</span>
										<svg
											class="h-6 w-6"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>
								</div>
							</div>
						</div>

						<!-- Content -->
						<div class="relative flex-1 px-4 sm:px-6">
							<!-- Your content here -->
                            {@render children?.()}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
