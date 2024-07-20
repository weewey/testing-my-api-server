import request from 'supertest';
import app from '../../src/app';
import { UserService } from '../../src/services/userService';
import { User } from '../../src/models/userModel';
import { MemoryDb } from '../../src/db/memoryDb';
import { UserController } from '../../src/controllers/userController';
import { App } from 'supertest/types';
import { createApp } from '../../src/appFactory';

describe('UserController', () => {
    let userService: UserService;
    let db: MemoryDb;
    let userController: UserController;
    let app: App;
    let user1: User = { id: '1', name: 'John Doe', email: 'john@example.com' };
    let user2: User = { id: '2', name: 'Jane Doe', email: 'jane@example.com' };

    beforeEach(() => {
        db = new MemoryDb()
        userService = new UserService(db);
        userController = new UserController(userService)
        app = createApp(userController)
    });

    it('should get all users', async () => {
        jest.spyOn(UserService.prototype, 'getAllUsers').mockResolvedValue([user1, user2]);

        const res = await request(app).get('/api/users');
        expect(res.status).toBe(200);
        expect(res.body).toEqual([user1, user2]);
    });

    it('should get user by id', async () => {
        jest.spyOn(UserService.prototype, 'getUserById').mockResolvedValue(user1);

        const res = await request(app).get('/api/users/1');
        expect(res.status).toBe(200);
        expect(res.body).toEqual(user1);
    });

    it('should return 404 if user not found by id', async () => {
        jest.spyOn(UserService.prototype, 'getUserById').mockResolvedValue(undefined);

        const res = await request(app).get('/api/users/3');
        expect(res.status).toBe(404);
        expect(res.body).toEqual({ message: 'User not found' });
    });

    it('should create a new user', async () => {
        const newUser: User = { id: '3', name: 'Sam Smith', email: 'sam@example.com' };
        jest.spyOn(UserService.prototype, 'addUser').mockResolvedValue(newUser);

        const res = await request(app).post('/api/users').send(newUser);
        expect(res.status).toBe(201);
        expect(res.body).toEqual(newUser);
    });

    it('should update user by id', async () => {
        const updatedUser: User = { id: '1', name: 'John Updated', email: 'john@example.com' };
        jest.spyOn(UserService.prototype, 'updateUserById').mockResolvedValue(updatedUser);

        const res = await request(app).put('/api/users/1').send(updatedUser);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(updatedUser);
    });

    it('should return 404 when updating non-existent user', async () => {
        jest.spyOn(UserService.prototype, 'updateUserById').mockResolvedValue(undefined);

        const res = await request(app).put('/api/users/3').send({ name: 'Non-existent User' });
        expect(res.status).toBe(404);
        expect(res.body).toEqual({ message: 'User not found' });
    });

    it('should delete user by id', async () => {
        jest.spyOn(UserService.prototype, 'getUserById').mockResolvedValue(user1);
        jest.spyOn(UserService.prototype, 'deleteUserById').mockResolvedValue();

        const res = await request(app).delete('/api/users/1');
        expect(res.status).toBe(204);
    });

    it('should return 404 when deleting non-existent user', async () => {
        jest.spyOn(UserService.prototype, 'getUserById').mockResolvedValue(undefined);

        const res = await request(app).delete('/api/users/3');
        expect(res.status).toBe(404);
        expect(res.body).toEqual({ message: 'User not found' });
    });
});
