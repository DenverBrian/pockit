<script lang="ts">
	import {
		currentUserStore,
		tasksStore,
		invalidateTasks,
		totalDone,
		totalInProgress,
		totalTodos,
		totalTasks
	} from '$lib/stores';
	import { db } from '$lib/db';
	import { get } from 'svelte/store';
	import TaskStatus from './taskstatus.svelte';
	import TaskForm from './taskform.svelte';
	import Icon from '@iconify/svelte';
	import type { Task } from '$lib/types';

	const getUserTasks = async () => {
		await invalidateTasks();
	};

	let currentTask: Task | undefined;

	const handleTaskStatusClick = async (id: string) => {
		const task = get(tasksStore).find((task) => task.id === id);
		if (task) {
			if (task.status === 'done') {
				task.status = 'todo';
			} else if (task.status === 'todo') {
				task.status = 'inProgress';
			} else {
				task.status = 'done';
			}
			await db.collection('tasks').update(id, task);
			tasksStore.update((tasks) => {
				tasks.find((t) => {
					if (t.id === id) {
						t.status = task.status;
					}
				});
				return tasks;
			});
		}
	};

	const hadleRemoveTask = async (id: string) => {
		tasksStore.update((tasks) => {
			tasks = tasks.filter((t) => t.id !== id);
			return tasks;
		});
		await db.collection('tasks').delete(id);
	};

	const handleDescriptionClick = async (task: Task) => {
		currentTask = task;
	};

	const handleInvalidate = async () => {
		currentTask = undefined;
	};
</script>

<div>
	<h1>Tasks</h1>
	{#if currentTask}
		<TaskForm task={currentTask} on:invalidate={handleInvalidate} />
	{:else}
		<TaskForm on:invalidate={handleInvalidate} />
	{/if}
	{#if $currentUserStore}
		{#await getUserTasks()}
			<p>loading...</p>
		{:then}
			{#if $tasksStore.length === 0}
				<p>no tasks</p>
			{:else}
				<p>
					Total tasks: {$totalTasks} - Total todo: {$totalTodos} - Total in progress:
					{$totalInProgress}
					- Total done: {$totalDone}
				</p>
			{/if}
			{#each $tasksStore as task}
				<p>
					<button
						on:click={() => handleDescriptionClick(task)}
						class="transparent"
						style="color: white;"
					>
						{task.description} -
					</button>
					<button
						on:click={() => handleTaskStatusClick(task.id)}
						class="transparent"><TaskStatus status={task.status} /></button
					>
					<button on:click={() => hadleRemoveTask(task.id)} class="transparent">
						<Icon icon="mdi:delete" color="red" width="1.5em" height="1.5em" />
					</button>
				</p>
			{/each}
		{/await}
	{/if}
</div>

<style>
	.transparent {
		background: transparent;
		border-color: transparent;
	}
</style>
