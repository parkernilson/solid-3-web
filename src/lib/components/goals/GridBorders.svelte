<script lang="ts">
	const {
		children,
		numCols,
		numElements,
		i,
        width = 0.5,
        color = "white"
	}: {
		children?: Function;
		numCols: number;
		numElements: number;
		i: number;
        color?: string;
        width?: number;
	} = $props();

	const row = Math.floor(i / numCols);
	const col = i % numCols;
	const numRows = Math.floor(numElements / numCols) + 1;
	const topBorder = row > 0
	const rightBorder = col < numCols - 1 && i < numElements - 1;
	const bottomBorder = row < numRows - 1 && i + numCols < numElements;
	const leftBorder = col > 0;

	const directions = ['top', 'right', 'bottom', 'left'];
    const include = [topBorder, rightBorder, bottomBorder, leftBorder];

	const borderStyles = () =>
		directions
			.map((v, i) => `border-${v}: ${width}px solid ${include[i] ? color : 'transparent'}`)
			.join('; ');
</script>

<div style={borderStyles()}>
	{@render children?.()}
</div>
