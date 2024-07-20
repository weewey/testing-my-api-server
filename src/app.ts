import express from 'express';
import userRoutes from './routes/userRoutes';
import { UserService } from './services/userService';

const userService = new UserService();
const app = express();

app.use(express.json());

app.use('/api/users', userRoutes(userService));

export default app;
