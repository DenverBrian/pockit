<script lang="ts">
	import { currentUserStore, tasksStore } from '$lib/stores';
	import { db } from '$lib/db';
	import type { Task } from '$lib/types';
	import Stats from './stats.svelte';
	import { get } from 'svelte/store';
	import Taskstatus from './taskstatus.svelte';
	const getUserTasks = async () => {
		const taskList = (await db
			.collection('tasks')
			.getFullList({ sort: '-created' })) as Task[];
		tasksStore.update(() => taskList);
	};

	const handleTaskClick = async (id: string) => {
		const task = get(tasksStore).find((task) => task.id === id);
		if (task) {
			if (task.status === 'done') {
				task.status = 'todo';
			} else if (task.status === 'todo') {
				task.status = 'inProgress';
			} else {
				task.status = 'done';
			}
			tasksStore.update((tasks) => {
				tasks.find((t) => {
					if (t.id === id) {
						t.status = task.status;
					}
				});
				return tasks;
			});
			await db.collection('tasks').update(id, task);
		}
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
					{task.description} -
					<button
						on:click={() => handleTaskClick(task.id)}
						style="background:transparent ; border-color: transparent;"
						><Taskstatus status={task.status} /></button
					>
				</p>
			{/each}
		{/await}
	{/if}
</div>
