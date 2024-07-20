import { Request, Response } from 'express';
import { getAllUsers, getUserById, addUser, updateUserById, deleteUserById } from '../services/userService';

export const getUsers = async (req: Request, res: Response) => {
    const users = await getAllUsers();
    res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
    const user = await getUserById(req.params.id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
    const newUser = await addUser(req.body);
    res.status(201).json(newUser);
};

export const updateUser = async (req: Request, res: Response) => {
    const updatedUser = await updateUserById(req.params.id, req.body);
    if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
};

export const deleteUser = async (req: Request, res: Response) => {
    const user = await getUserById(req.params.id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    await deleteUserById(req.params.id);
    res.status(204).send();
};
