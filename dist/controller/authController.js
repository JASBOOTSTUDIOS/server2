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
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usersAccessModel_1 = require("../model/usersAccessModel");
const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("llego el request");
        const { username, email, u_password } = req.body;
        const existingUser = yield usersAccessModel_1.UserModel.findUserByEmail(email);
        if (existingUser) {
            res.status(400).json({ message: "Email already exists" });
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(u_password, 10);
        yield usersAccessModel_1.UserModel.createUser({ username, email, u_password: hashedPassword });
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        console.log(`El error del catch: ${error}`);
        res.status(500).json({ message: "Error al conectar al server." });
        next(error); // ✅ Pasamos el error a Express
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, u_password } = req.body;
        const user = yield usersAccessModel_1.UserModel.findUserByEmail(email);
        if (!user) {
            console.log("Error 1");
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        const isMatch = yield bcryptjs_1.default.compare(u_password, user.u_password);
        if (!isMatch) {
            console.log("Error 2");
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
        console.log("Error 3");
        res.json({
            token,
            user: { id: user.id, username: user.username, email: user.email },
        });
    }
    catch (error) {
        console.log("catch Error find");
        next(error); // error inexpress.
    }
});
exports.login = login;
