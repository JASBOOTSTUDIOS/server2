"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controller/authController");
const router = (0, express_1.Router)();
router.post("/auth/register", authController_1.register);
router.post("/auth/login", authController_1.login);
exports.default = router;
