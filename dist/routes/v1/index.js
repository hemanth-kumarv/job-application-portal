"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const JWTAuthMiddleware_1 = require("../../middlewares/JWTAuthMiddleware");
const jobs_1 = __importDefault(require("./jobs"));
router.use("/job", JWTAuthMiddleware_1.authMiddleware, jobs_1.default);
const applications_1 = __importDefault(require("./applications"));
router.use("/application", JWTAuthMiddleware_1.authMiddleware, applications_1.default);
const users_1 = __importDefault(require("./users"));
router.use("/user", users_1.default);
exports.default = router;
