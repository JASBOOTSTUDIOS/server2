// src/controllers/usersController.ts
import { Request, Response } from 'express';
import { UserModel } from '../model/usersAccessModel';
import { DataUserModel } from '../model/dataUsersModel';

// Obtener todos los usuarios (usuarios con sus datos separados)
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios', error });
    }
};

// Obtener un usuario por ID
export const getUserById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const user = await UserModel.getUserById(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario', error });
    }
};

// Obtener todos los datos de un usuario por ID (incluyendo los datos separados)
export const getUserDataById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const user = await UserModel.getUserById(id);
        if (user) {
            const userData = await DataUserModel.getDataByUserId(user.id!);
            res.json({ user, userData });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los datos del usuario', error });
    }
};
