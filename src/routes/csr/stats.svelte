<script lang="ts">
	import { tasksStore } from '$lib/stores';
</script>

<div>
	<h1>Stats</h1>

	<div>
		<p>Total tasks: {$tasksStore.length}</p>
		<p>
			Total tasks todo: {$tasksStore.filter((task) => task.status === 'todo')
				.length}
		</p>
		<p>
			Total tasks In Progress: {$tasksStore.filter(
				(task) => task.status === 'inProgress'
			).length}
		</p>
		<p>
			Total tasks done: {$tasksStore.filter((task) => task.status === 'done')
				.length}
		</p>
	</div>
</div>
