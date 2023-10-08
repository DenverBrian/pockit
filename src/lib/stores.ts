import { derived, writable } from 'svelte/store';
import type { Task, User } from './types';
import { db } from './db';
import { countTasks } from './utils';

export const currentUserStore = writable<User | null>();

export const tasksStore = writable<Task[]>();

export const totalTasks = derived(tasksStore, (tasks) =>
	countTasks(tasks, 'all')
);
export const totalTodos = derived(tasksStore, (tasks) =>
	countTasks(tasks, 'todo')
);
export const totalInProgress = derived(tasksStore, (tasks) =>
	countTasks(tasks, 'inProgress')
);
export const totalDone = derived(tasksStore, (tasks) =>
	countTasks(tasks, 'done')
);

export const invalidateTasks = async () => {
	const taskList = (await db
		.collection('tasks')
		.getFullList({ sort: '-created' })) as Task[];
	tasksStore.update(() => taskList);
};
