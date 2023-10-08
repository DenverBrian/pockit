<script lang="ts">
	import { db } from '$lib/db';
	import { invalidateTasks } from '$lib/stores';
	import type { Task, TaskStatus } from '$lib/types';
	const taskStatus = ['todo', 'inProgress', 'done'];
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let task: Task = {
		id: '',
		owner: '',
		description: '',
		status: 'todo',
		created: new Date(),
		updated: new Date()
	};
	const handleSubmit = async (event: SubmitEvent) => {
		const formData = new FormData(event.target as HTMLFormElement);
		if (db.authStore.model) {
			if (task.id !== '') {
				await db
					.collection('tasks')
					.update(task.id, { ...task, updated: new Date() });
			} else {
				task.owner = db.authStore.model.id;
				task.description = formData.get('description') as string;
				task.status = formData.get('status') as TaskStatus;
				await db.collection('tasks').create(task);
			}
			await invalidateTasks();
			dispatch('invalidate');
		}
	};
</script>

<form on:submit|preventDefault={handleSubmit}>
	<label for="description">Description</label>
	<input type="text" name="description" bind:value={task.description} />
	<label for="status">Status</label>
	<select bind:value={task.status} name="status">
		{#each taskStatus as status}
			<option value={status}>{status}</option>
		{/each}
	</select>
	<input type="submit" value={task.id !== '' ? 'Update' : 'Create'} />
</form>
{#if task.id !== ''}
	<button on:click={() => dispatch('invalidate')}>Cancel update</button>
	<p>Created: {new Date(task.created).toLocaleString()}</p>
	<p>Last Updated: {new Date(task.updated).toLocaleString()}</p>
{/if}
