<script lang="ts">
	const {
		children,
		bp,
		hfull = true
	}: { children?: Function; bp?: 'sm'; hfull?: boolean } = $props();
</script>

<div class="{bp === 'sm' ? 'sm:px-2' : 'px-2'} {hfull ? 'h-full' : ''}">
	{@render children?.()}
</div>
