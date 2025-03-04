<script lang="ts">
	import type { LayoutData } from './$types';

	const { children, data }: { children?: Function; data: LayoutData } = $props();
</script>

{@render children?.()}
