<script lang="ts">
	import { currentUserStore, tasksStore } from '$lib/stores';
	import { db } from '$lib/db';
	import type { Task } from '$lib/types';
	import Stats from './stats.svelte';
	import Taskstatus from './taskstatus.svelte';
	const getUserTasks = async () => {
		const taskList = (await db
			.collection('tasks')
			.getFullList({ sort: '-created' })) as Task[];
		tasksStore.update(() => taskList);
	};
</script>

<div>
	<h1>Tasks</h1>
	{#if $currentUserStore}
		{#await getUserTasks()}
			<p>loading...</p>
		{:then}
			{#each $tasksStore as task}
				<p>
					{task.description} - <Taskstatus status={task.status} />
				</p>
			{/each}
		{/await}
	{/if}
	<!-- <Stats /> -->
</div>
