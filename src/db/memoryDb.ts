import { User } from '../models/userModel';

let users: User[] = []; // In-memory database

export const getUsers = (): User[] => users;

export const setUsers = (newUsers: User[]): void => {
    users = newUsers;
};

export const resetUsers = (): void => {
    users = [];
};
