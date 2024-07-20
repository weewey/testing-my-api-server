import { User } from '../models/userModel';

export interface UserRepository {
    getUsers(): User[];
    setUsers(newUsers: User[]): void;
}

export class MemoryDb implements UserRepository {
    private users: User[] = []; // In-memory database

    getUsers(): User[] {
        return this.users;
    }

    setUsers(newUsers: User[]): void {
        this.users = newUsers;
    }

    resetUsers(): void {
        this.users = [];
    }
}
