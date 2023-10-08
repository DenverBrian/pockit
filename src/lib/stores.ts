import { writable } from 'svelte/store';
import type { Task, User } from './types';

export const currentUserStore = writable<User | null>();

export const tasksStore = writable<Task[]>();
