<script lang="ts">
	import { db } from '$lib/db';
	import type { Task } from '$lib/types';
	const taskStatus = ['todo', 'inProgress', 'done'];
	export let task: Pick<Task, 'id' | 'owner' | 'description' | 'status'> = {
		id: '',
		owner: '',
		description: '',
		status: 'todo'
	};
	const handleSubmit = async (event: SubmitEvent) => {
		const formData = new FormData(event.target as HTMLFormElement);
	};
</script>

<form>
	<label for="description">Description</label>
	<input type="text" name="description" />
	<label for="status">Status</label>
	<select bind:value={task.status} name="status">
		{#each taskStatus as status}
			<option value={status}>{status}</option>
		{/each}
	</select>
</form>
