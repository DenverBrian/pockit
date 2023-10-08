<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { TaskStatus } from '$lib/types';
	export let status: TaskStatus = 'todo';
</script>

<span>
	{#if status === 'todo'}
		<Icon icon="ri:todo-line" color="orange" width="1.5em" height="1.5em" />
	{:else if status === 'inProgress'}
		<Icon
			icon="tabler:progress"
			color="blue"
			class="svg"
			width="1.5em"
			height="1.5em"
		/>
	{:else}
		<Icon
			icon="ant-design:file-done-outlined"
			color="green"
			width="1.5em"
			height="1.5em"
		/>
	{/if}
</span>
