import { UserService } from '../../src/services/userService';
import { User } from '../../src/models/userModel';
import { MemoryDb } from '../../src/db/memoryDb';

describe('UserService', () => {
    let userService: UserService;
    let db: MemoryDb;
    let user1: User = { id: '1', name: 'John Doe', email: 'john@example.com' };
    let user2: User = { id: '2', name: 'Jane Doe', email: 'jane@example.com' };

    beforeEach(() => {
        db = new MemoryDb();
        userService = new UserService(db);
    });

    it('should get all users', async () => {
        jest.spyOn(db, 'getUsers').mockReturnValue([user1, user2]);

        const users = await userService.getAllUsers();
        expect(users).toEqual([user1, user2]);
        expect(db.getUsers).toHaveBeenCalled();
    });

    it('should get user by id', async () => {
        jest.spyOn(db, 'getUsers').mockReturnValue([user1, user2]);

        const user = await userService.getUserById('1');
        expect(user).toEqual(user1);
        expect(db.getUsers).toHaveBeenCalled();
    });

    it('should return undefined if user not found by id', async () => {
        jest.spyOn(db, 'getUsers').mockReturnValue([user1, user2]);

        const user = await userService.getUserById('3');
        expect(user).toBeUndefined();
        expect(db.getUsers).toHaveBeenCalled();
    });

    it('should add a new user', async () => {
        jest.spyOn(db, 'getUsers').mockReturnValue([user1, user2]);
        jest.spyOn(db, 'setUsers');

        const newUser: User = { id: '3', name: 'Sam Smith', email: 'sam@example.com' };
        const addedUser = await userService.addUser(newUser);
        expect(addedUser).toEqual(newUser);
        expect(db.getUsers).toHaveBeenCalled();
        expect(db.setUsers).toHaveBeenCalledWith([user1, user2, newUser]);
    });

    it('should update user by id', async () => {
        jest.spyOn(db, 'getUsers').mockReturnValue([user1, user2]);
        jest.spyOn(db, 'setUsers');

        const updatedUser: User = { id: '1', name: 'John Updated', email: 'john@example.com' };
        const user = await userService.updateUserById('1', updatedUser);
        expect(user).toEqual(updatedUser);
        expect(db.getUsers).toHaveBeenCalled();
        expect(db.setUsers).toHaveBeenCalledWith([updatedUser, user2]);
    });

    it('should return undefined if updating non-existent user', async () => {
        jest.spyOn(db, 'getUsers').mockReturnValue([user1, user2]);
        jest.spyOn(db, 'setUsers');

        const updatedUser: User = { id: '3', name: 'Non-existent User', email: 'nonexistent@example.com' };
        const user = await userService.updateUserById('3', updatedUser);
        expect(user).toBeUndefined();
        expect(db.getUsers).toHaveBeenCalled();
        expect(db.setUsers).not.toHaveBeenCalled();
    });

    it('should delete user by id', async () => {
        jest.spyOn(db, 'getUsers').mockReturnValue([user1, user2]);
        jest.spyOn(db, 'setUsers');

        await userService.deleteUserById('1');
        expect(db.getUsers).toHaveBeenCalled();
        expect(db.setUsers).toHaveBeenCalledWith([user2]);
    });

    it('should do nothing if deleting non-existent user', async () => {
        jest.spyOn(db, 'getUsers').mockReturnValue([user1, user2]);
        jest.spyOn(db, 'setUsers');

        await userService.deleteUserById('3');
        expect(db.getUsers).toHaveBeenCalled();
        expect(db.setUsers).toHaveBeenCalledWith([user1, user2]);
    });
});


// import { UserService } from '../../src/services/userService';
// import { User } from '../../src/models/userModel';
// import { MemoryDb } from '../../src/db/memoryDb';

// describe('UserService', () => {
//     let userService: UserService;
//     let user1: User = { id: '1', name: 'John Doe', email: 'john@example.com' };
//     let user2: User = { id: '2', name: 'Jane Doe', email: 'jane@example.com' };

//     beforeEach(() => {
//         userService = new UserService();
//     });

//     it('should get all users', async () => {
//         jest.spyOn(MemoryDb.prototype, 'getUsers').mockReturnValue([user1, user2]);

//         const users = await userService.getAllUsers();
//         expect(users).toEqual([user1, user2]);
//         expect(MemoryDb.prototype.getUsers).toHaveBeenCalled();
//     });

//     it('should get user by id', async () => {
//         jest.spyOn(MemoryDb.prototype, 'getUsers').mockReturnValue([user1, user2]);

//         const user = await userService.getUserById('1');
//         expect(user).toEqual(user1);
//         expect(MemoryDb.prototype.getUsers).toHaveBeenCalled();
//     });

//     it('should return undefined if user not found by id', async () => {
//         jest.spyOn(MemoryDb.prototype, 'getUsers').mockReturnValue([user1, user2]);

//         const user = await userService.getUserById('3');
//         expect(user).toBeUndefined();
//         expect(MemoryDb.prototype.getUsers).toHaveBeenCalled();
//     });

//     it('should add a new user', async () => {
//         jest.spyOn(MemoryDb.prototype, 'getUsers').mockReturnValue([user1, user2]);
//         jest.spyOn(MemoryDb.prototype, 'setUsers');

//         const newUser: User = { id: '3', name: 'Sam Smith', email: 'sam@example.com' };
//         const addedUser = await userService.addUser(newUser);
//         expect(addedUser).toEqual(newUser);
//         expect(MemoryDb.prototype.getUsers).toHaveBeenCalled();
//         expect(MemoryDb.prototype.setUsers).toHaveBeenCalledWith([user1, user2, newUser]);
//     });

//     it('should update user by id', async () => {
//         jest.spyOn(MemoryDb.prototype, 'getUsers').mockReturnValue([user1, user2]);
//         jest.spyOn(MemoryDb.prototype, 'setUsers');

//         const updatedUser: User = { id: '1', name: 'John Updated', email: 'john@example.com' };
//         const user = await userService.updateUserById('1', updatedUser);
//         expect(user).toEqual(updatedUser);
//         expect(MemoryDb.prototype.getUsers).toHaveBeenCalled();
//         expect(MemoryDb.prototype.setUsers).toHaveBeenCalledWith([updatedUser, user2]);
//     });

//     it('should return undefined if updating non-existent user', async () => {
//         jest.spyOn(MemoryDb.prototype, 'getUsers').mockReturnValue([user1, user2]);
//         jest.spyOn(MemoryDb.prototype, 'setUsers');

//         const updatedUser: User = { id: '3', name: 'Non-existent User', email: 'nonexistent@example.com' };
//         const user = await userService.updateUserById('3', updatedUser);
//         expect(user).toBeUndefined();
//         expect(MemoryDb.prototype.getUsers).toHaveBeenCalled();
//         expect(MemoryDb.prototype.setUsers).not.toHaveBeenCalled();
//     });

//     it('should delete user by id', async () => {
//         jest.spyOn(MemoryDb.prototype, 'getUsers').mockReturnValue([user1, user2]);
//         jest.spyOn(MemoryDb.prototype, 'setUsers');

//         await userService.deleteUserById('1');
//         expect(MemoryDb.prototype.getUsers).toHaveBeenCalled();
//         expect(MemoryDb.prototype.setUsers).toHaveBeenCalledWith([user2]);
//     });

//     it('should do nothing if deleting non-existent user', async () => {
//         jest.spyOn(MemoryDb.prototype, 'getUsers').mockReturnValue([user1, user2]);
//         jest.spyOn(MemoryDb.prototype, 'setUsers');

//         await userService.deleteUserById('3');
//         expect(MemoryDb.prototype.getUsers).toHaveBeenCalled();
//         expect(MemoryDb.prototype.setUsers).toHaveBeenCalledWith([user1, user2]);
//     });
// });
