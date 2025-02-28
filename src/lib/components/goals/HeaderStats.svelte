<script lang="ts">
	const { streak, record, startDate }: { streak: number; record: number; startDate: string | Date } =
		$props();

    const startDateObj = new Date(startDate);

    const formattedStartDate = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "2-digit",
    }).format(startDateObj);
</script>

<div class="flex items-center">
    <div class="flex-1 flex flex-col items-center">
        <p class="text-3xl">{streak}</p>
        <p>Streak</p>
    </div>
    <div class="border-white border-r border-1 h-12"></div>
    <div class="flex-1 flex flex-col items-center">
        <p class="text-3xl">{record}</p>
        <p>Record</p>
    </div>
    <div class="border-white border-r border-1 h-12"></div>
    <div class="flex-1 flex flex-col justify-end items-center">
        <p class="text-xl xs:text-2xl">{formattedStartDate}</p>
        <p>Started</p>
    </div>
</div>

