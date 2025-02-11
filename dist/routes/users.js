"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../controller/usersController");
const router = (0, express_1.Router)();
router.get("/", usersController_1.getUsers);
router.get("/:id", usersController_1.getUserById);
exports.default = router;
