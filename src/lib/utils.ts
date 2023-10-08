import type { Task, TaskStatus } from './types';

export const countTasks = (
	tasks: Task[] | undefined,
	status: TaskStatus | 'all'
): number => {
	if (!tasks) return 0;
	switch (status) {
		case 'all':
			return tasks.length;
		case 'todo':
			return tasks.filter((task) => task.status === 'todo').length;
		case 'inProgress':
			return tasks.filter((task) => task.status === 'inProgress').length;
		case 'done':
			return tasks.filter((task) => task.status === 'done').length;
		default:
			return 0;
	}
};
