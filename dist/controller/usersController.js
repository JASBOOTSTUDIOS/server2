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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getUsers = void 0;
const db_1 = __importDefault(require("../config/db"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.default.query(`
      SELECT * FROM usersaccess u
      LEFT JOIN data_users d ON u.id = d.user_id
    `);
        res.json(rows);
    }
    catch (error) {
        console.log("El codigo dio error" + error);
        res.status(500).json({ error: "Error al obtener los Usuarios" });
    }
    ;
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const [rows] = yield db_1.default.query('SELECT * FROM usersaccess WHERE id = ?', [id]);
        if (rows.length === 0) {
            res.status(404).json({ error: "Usuario no encontrado." });
        }
        ;
        res.json(rows[0]);
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener el Usuario." });
    }
});
exports.getUserById = getUserById;
