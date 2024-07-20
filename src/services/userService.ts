import { UserRepository } from '../db/memoryDb';
import { User } from '../models/userModel';

export interface IUserService {
    getAllUsers(): Promise<User[]>;
    getUserById(id: string): Promise<User | undefined>;
    addUser(user: User): Promise<User>;
    updateUserById(id: string, updatedUser: User): Promise<User | undefined>;
    deleteUserById(id: string): Promise<void>;
}

export class UserService implements IUserService {
    private db: UserRepository;

    constructor(db: UserRepository) {
        this.db = db;
    }

    async getAllUsers(): Promise<User[]> {
        return this.db.getUsers();
    }

    async getUserById(id: string): Promise<User | undefined> {
        return this.db.getUsers().find(user => user.id === id);
    }

    async addUser(user: User): Promise<User> {
        const users = this.db.getUsers();
        users.push(user);
        this.db.setUsers(users);
        return user;
    }

    async updateUserById(id: string, updatedUser: User): Promise<User | undefined> {
        const users = this.db.getUsers();
        const index = users.findIndex(user => user.id === id);
        if (index !== -1) {
            users[index] = updatedUser;
            this.db.setUsers(users);
            return updatedUser;
        }
        return undefined;
    }

    async deleteUserById(id: string): Promise<void> {
        const users = this.db.getUsers();
        this.db.setUsers(users.filter(user => user.id !== id));
    }
}

// NOT DEPENDENCY INJECTED

// import { User } from '../models/userModel';
// import { MemoryDb } from '../db/memoryDb';

// export class UserService {
//     private db: MemoryDb = new MemoryDb();

//     async getAllUsers(): Promise<User[]> {
//         return this.db.getUsers();
//     }

//     async getUserById(id: string): Promise<User | undefined> {
//         return this.db.getUsers().find(user => user.id === id);
//     }

//     async addUser(user: User): Promise<User> {
//         const users = this.db.getUsers();
//         users.push(user);
//         this.db.setUsers(users);
//         return user;
//     }

//     async updateUserById(id: string, updatedUser: User): Promise<User | undefined> {
//         const users = this.db.getUsers();
//         const index = users.findIndex(user => user.id === id);
//         if (index !== -1) {
//             users[index] = updatedUser;
//             this.db.setUsers(users);
//             return updatedUser;
//         }
//         return undefined;
//     }

//     async deleteUserById(id: string): Promise<void> {
//         const users = this.db.getUsers();
//         this.db.setUsers(users.filter(user => user.id !== id));
//     }
// }
