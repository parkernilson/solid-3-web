<script lang="ts">
	const { streak, record, startDate }: { streak: number; record: number; startDate: string } =
		$props();

    const startDateObj = new Date(startDate);

    const formattedStartDate = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "2-digit",
    }).format(startDateObj);
</script>

<div class="flex">
    <div class="flex-1 flex flex-col items-center">
        <p>{streak}</p>
        <p>Streak</p>
    </div>
    <div class="border-gray-700 border-r border-1"></div>
    <div class="flex-1 flex flex-col items-center">
        <p>{record}</p>
        <p>Record</p>
    </div>
    <div class="border-gray-700 border-r border-1"></div>
    <div class="flex-1 flex flex-col items-center">
        <p>{formattedStartDate}</p>
        <p>Started</p>
    </div>
</div>

