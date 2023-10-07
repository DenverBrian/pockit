<script lang="ts">
	import { db } from '$lib/db';
	import { createEventDispatcher } from 'svelte';
	import { currentUserStore } from '$lib/stores';
	import { PUBLIC_PB_URL } from '$env/static/public';

	const dispatch = createEventDispatcher();
	const handleLogout = async () => {
		db.authStore.clear();
		dispatch('something', {
			action: 'logout'
		});
	};
</script>

<div style="display: flex; flex-direction: column;">
	<h1>Current User</h1>
	<div style="display: flex; flex-direction: column; margin: 10px">
		{#if $currentUserStore}
			<p>{$currentUserStore.name}</p>
			<p>{$currentUserStore.email}</p>
			<img
				width="250px"
				height="250px"
				src={`${PUBLIC_PB_URL}/api/files/_pb_users_auth_/${$currentUserStore.id}/${$currentUserStore.avatar}`}
				alt="avatar"
			/>
		{/if}
	</div>
	<button on:click={handleLogout}>Logout</button>
</div>
