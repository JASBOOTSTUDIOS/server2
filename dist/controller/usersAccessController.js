"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserDataById = exports.getUserById = exports.getUsers = void 0;
const usersAccessModel_1 = require("../model/usersAccessModel");
const dataUsersModel_1 = require("../model/dataUsersModel");
// Obtener todos los usuarios (usuarios con sus datos separados)
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield usersAccessModel_1.UserModel.getAllUsers();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios', error });
    }
});
exports.getUsers = getUsers;
// Obtener un usuario por ID
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const user = yield usersAccessModel_1.UserModel.getUserById(id);
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario', error });
    }
});
exports.getUserById = getUserById;
// Obtener todos los datos de un usuario por ID (incluyendo los datos separados)
const getUserDataById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const user = yield usersAccessModel_1.UserModel.getUserById(id);
        if (user) {
            const userData = yield dataUsersModel_1.DataUserModel.getDataByUserId(user.id);
            res.json({ user, userData });
        }
        else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener los datos del usuario', error });
    }
});
exports.getUserDataById = getUserDataById;
