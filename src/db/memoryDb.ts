import { User } from '../models/userModel';

export class MemoryDb {
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
