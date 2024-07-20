import express from 'express';
import { UserController } from './controllers/userController';
import userRoutes from './routes/userRoutes';

export const createApp = (userController: UserController) => {
    const app = express();
    app.use(express.json());
    app.use('/api/users', userRoutes(userController));
    return app;
};
