"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/usersRoutes.ts
const express_1 = require("express");
const usersAccessController_1 = require("../controller/usersAccessController");
const router = (0, express_1.Router)();
router.get('/', usersAccessController_1.getUsers); // Obtener todos los usuarios
router.get('/:id', usersAccessController_1.getUserById); // Obtener usuario por ID
router.get('/:id/data', usersAccessController_1.getUserDataById); // Obtener datos de usuario por ID
exports.default = router;
