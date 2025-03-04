<script lang="ts">
    const { children, bp }: { children?: Function, bp?: "sm" } = $props()
</script>

<div class="{bp === "sm" ? 'sm:px-2' : 'px-2'}">
    {@render children?.()}
</div>