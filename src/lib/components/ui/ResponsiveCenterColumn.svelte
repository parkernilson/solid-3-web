<script lang="ts">
    const { children }: { children?: Function } = $props()
</script>

<div class="w-full h-full flex justify-center">
    <div class="w-full h-full flex flex-col sm:w-[640px]">
        {@render children?.()}
    </div>
</div>