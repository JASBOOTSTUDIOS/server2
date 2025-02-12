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
exports.UserModel = void 0;
const db_1 = __importDefault(require("../config/db"));
exports.UserModel = {
    getAllUsers: () => __awaiter(void 0, void 0, void 0, function* () {
        const [rows] = yield db_1.default.query('SELECT * FROM usersaccess');
        return rows;
    }),
    findUserByEmail: (email) => __awaiter(void 0, void 0, void 0, function* () {
        const [rows] = yield db_1.default.query("SELECT * FROM usersaccess WHERE email = ?", [email]);
        return rows[0];
    }),
    getUserById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const [rows] = yield db_1.default.query('SELECT * FROM usersaccess WHERE id = ?', [id]);
        return rows.length > 0 ? rows[0] : null;
    }),
    createUser: (user) => __awaiter(void 0, void 0, void 0, function* () {
        yield db_1.default.query('INSERT INTO usersaccess (username, email, u_password) VALUES (?, ?, ?)', [user.username, user.email, user.u_password]);
    })
};
