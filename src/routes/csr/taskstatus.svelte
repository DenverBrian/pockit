<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { TaskStatus } from '$lib/types';
	export let status: TaskStatus = 'todo';
</script>

<span>
	{#if status === 'todo'}
		<Icon icon="ri:todo-line" color="orange" />
	{:else if status === 'inProgress'}
		<Icon icon="tabler:progress" color="blue" />
	{:else}
		<Icon icon="ant-design:file-done-outlined" color="green" />
	{/if}
</span>
