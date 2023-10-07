<script lang="ts">
	import { db } from '$lib/db';
	import { createEventDispatcher } from 'svelte';
	import type { RegisterUser } from '$lib/types';
	const dispatch = createEventDispatcher();

	const handleRegister = async (event: SubmitEvent) => {
		const formData = new FormData(event.target as HTMLFormElement);

		const newUser: RegisterUser = {
			name: formData.get('name') as string,
			username: (formData.get('username') as string) || '',
			email: formData.get('email') as string,
			password: formData.get('password') as string,
			passwordConfirm: formData.get('passwordConfirm') as string,
			avatar: formData.get('avatar') as string
		};

		await db
			.collection('users')
			.create(newUser)
			.then((result) => {
				if (result.id) {
					console.log('Success');
					dispatch('something', {
						action: 'register'
					});
				}
			})
			.catch((error) => {
				console.log(error);
				console.log(`Something went wrong: ${(error as Error).message}`);
			});
	};
</script>

<form
	on:submit|preventDefault={handleRegister}
	style="display: flex; flex-direction: column; width: 300px;"
>
	<h1>Register Form</h1>
	<label for="name">name</label>
	<input type="text" name="name" id="name" />
	<label for="username">Username</label>
	<input type="text" name="username" id="username" />
	<label for="email">Email</label>
	<input type="email" name="email" id="email" />
	<label for="password">Password</label>
	<input type="password" name="password" id="password" />
	<label for="passwordConfirm">Confirm Password</label>
	<input type="password" name="passwordConfirm" id="passwordConfirm" />
	<label for="avatar">Avatar</label>
	<input type="file" name="avatar" id="avatar" />
	<button type="submit" style="margin-top: 10px">Register</button>
</form>
