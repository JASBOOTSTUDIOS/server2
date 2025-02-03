// src/routes/usersRoutes.ts
import { Router } from 'express';
import { getUsers, getUserById, getUserDataById } from '../controller/usersAccessController';

const router = Router();

router.get('/', getUsers); // Obtener todos los usuarios
router.get('/:id', getUserById); // Obtener usuario por ID
router.get('/:id/data', getUserDataById); // Obtener datos de usuario por ID

export default router;
