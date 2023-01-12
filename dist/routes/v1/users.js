"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const users_1 = require("../../controllers/v1/users");
const JWTAuthMiddleware_1 = require("../../middlewares/JWTAuthMiddleware");
// POST
router.post("/login", JWTAuthMiddleware_1.loginMiddleware);
router.post("/", users_1.addUser);
exports.default = router;
