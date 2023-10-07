<script lang="ts">
	import Login from './login.svelte';
	import Register from './register.svelte';
	import { db } from '$lib/db';
	import type { User } from '$lib/types';
	import Logout from './logout.svelte';
	import { currentUserStore } from '$lib/stores';

	const handleSomething = async (event: CustomEvent) => {
		const { action } = event.detail;
		if (action === 'login') {
			currentUserStore.update(() => db.authStore.model as User);
		} else if (action === 'logout') {
			currentUserStore.update(() => null);
		}
	};
</script>

<div style="color: #ffffff;">
	<h1>The following are implemented through CSR</h1>
	<div style="display: flex; flex-direction: row; gap: 5rem">
		<Register on:something={handleSomething} />
		{#if $currentUserStore}
			<Logout on:something={handleSomething} />
		{:else}
			<Login on:something={handleSomething} />
		{/if}
	</div>
</div>
