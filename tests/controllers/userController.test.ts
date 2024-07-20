import request from 'supertest';
import app from '../../src/app';
import { resetUsers } from '../../src/db/memoryDb';

describe('User Controller', () => {
    let user1 = { id: '1', name: 'John Doe', email: 'john@example.com' };
    let user2 = { id: '2', name: 'Jane Doe', email: 'jane@example.com' };

    beforeEach(async () => {
        resetUsers(); // Reset the in-memory database
        await request(app).post('/api/users').send(user1);
        await request(app).post('/api/users').send(user2);
    });

    it('should get all users', async () => {
        const res = await request(app).get('/api/users');
        expect(res.status).toBe(200);
        expect(res.body).toContainEqual(user1);
        expect(res.body).toContainEqual(user2);
    });

    it('should get user by id', async () => {
        const res = await request(app).get('/api/users/1');
        expect(res.status).toBe(200);
        expect(res.body).toEqual(user1);
    });

    it('should create a new user', async () => {
        const newUser = { id: '3', name: 'Sam Smith', email: 'sam@example.com' };
        const res = await request(app).post('/api/users').send(newUser);
        expect(res.status).toBe(201);
        expect(res.body).toEqual(newUser);

        const getRes = await request(app).get('/api/users/3');
        expect(getRes.status).toBe(200);
        expect(getRes.body).toEqual(newUser);

        // Cleanup
        await request(app).delete('/api/users/3');
    });

    it('should update user by id', async () => {
        const updatedUser = { ...user1, name: 'John Updated' };
        const res = await request(app).put('/api/users/1').send(updatedUser);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(updatedUser);

        const getRes = await request(app).get('/api/users/1');
        expect(getRes.status).toBe(200);
        expect(getRes.body).toEqual(updatedUser);
    });

    it('should delete user by id', async () => {
        const res = await request(app).delete('/api/users/1');
        expect(res.status).toBe(204);

        const getRes = await request(app).get('/api/users/1');
        expect(getRes.status).toBe(404);
    });
});
