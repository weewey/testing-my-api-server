import { User } from '../models/userModel';
import { getUsers, setUsers } from '../db/memoryDb';

export const getAllUsers = async (): Promise<User[]> => {
    return getUsers();
};

export const getUserById = async (id: string): Promise<User | undefined> => {
    return getUsers().find(user => user.id === id);
};

export const addUser = async (user: User): Promise<User> => {
    const users = getUsers();
    users.push(user);
    setUsers(users);
    return user;
};

export const updateUserById = async (id: string, updatedUser: User): Promise<User | undefined> => {
    const users = getUsers();
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        users[index] = updatedUser;
        setUsers(users);
        return updatedUser;
    }
    return undefined;
};

export const deleteUserById = async (id: string): Promise<void> => {
    const users = getUsers();
    setUsers(users.filter(user => user.id !== id));
};
