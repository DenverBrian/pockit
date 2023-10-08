<script lang="ts">
	import { db } from '$lib/db';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	const handleLogin = async (event: Event) => {
		const formData = new FormData(event.target as HTMLFormElement);
		await db
			.collection('users')
			.authWithPassword(
				formData.get('identity') as string,
				formData.get('password') as string
			)
			.then((result) => {
				if (result.token) {
					dispatch('something', {
						action: 'login'
					});
				}
			})
			.catch((error) => {
				console.log(`Something went wrong: ${(error as Error).message}`);
			});
	};
</script>

<form
	on:submit|preventDefault={handleLogin}
	style="display: flex; flex-direction: column; width: 300px;"
>
	<h1>Login</h1>
	<label for="identity">Username or email</label>
	<input type="text" name="identity" />
	<label for="password">Password</label>
	<input type="password" name="password" />
	<button type="submit" style="margin-top: 10px">Login</button>
</form>
