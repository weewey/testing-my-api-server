import { Router } from 'express';
import { UserController } from '../controllers/userController';

const userRoutes = (userController: UserController) => {
    const router = Router();

    router.get('/', userController.getUsers);
    router.get('/:id', userController.getUser);
    router.post('/', userController.createUser);
    router.put('/:id', userController.updateUser);
    router.delete('/:id', userController.deleteUser);

    return router;
};

export default userRoutes;