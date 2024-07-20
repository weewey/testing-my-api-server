import { Request, Response } from 'express';
import { UserService } from '../services/userService';

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    getUsers = async (req: Request, res: Response) => {
        const users = await this.userService.getAllUsers();
        res.json(users);
    };

    getUser = async (req: Request, res: Response) => {
        const user = await this.userService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    };

    createUser = async (req: Request, res: Response) => {
        const newUser = await this.userService.addUser(req.body);
        res.status(201).json(newUser);
    };

    updateUser = async (req: Request, res: Response) => {
        const updatedUser = await this.userService.updateUserById(req.params.id, req.body);
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    };

    deleteUser = async (req: Request, res: Response) => {
        const user = await this.userService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await this.userService.deleteUserById(req.params.id);
        res.status(204).send();
    };
}