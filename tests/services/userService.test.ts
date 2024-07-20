import { addUser, getAllUsers, getUserById, updateUserById, deleteUserById } from '../../src/services/userService';
import { User } from '../../src/models/userModel';
import { resetUsers } from '../../src/db/memoryDb';

describe('User Service', () => {
    let user1: User;
    let user2: User;

    beforeEach(async () => {
        resetUsers(); // Reset the in-memory database
        user1 = { id: '1', name: 'John Doe', email: 'john@example.com' };
        user2 = { id: '2', name: 'Jane Doe', email: 'jane@example.com' };
        await addUser(user1);
        await addUser(user2);
    });

    it('should add and get users', async () => {
        const users = await getAllUsers();
        expect(users).toContainEqual(user1);
        expect(users).toContainEqual(user2);
    });

    it('should get user by id', async () => {
        const user = await getUserById('1');
        expect(user).toEqual(user1);
    });

    it('should update user by id', async () => {
        const updatedUser = { ...user1, name: 'John Updated' };
        const result = await updateUserById('1', updatedUser);
        expect(result).toEqual(updatedUser);
        const user = await getUserById('1');
        expect(user).toEqual(updatedUser);
    });

    it('should delete user by id', async () => {
        await deleteUserById('1');
        const users = await getAllUsers();
        expect(users).not.toContainEqual(user1);
    });
});
