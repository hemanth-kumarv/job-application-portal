import { Router } from "express";
const router = Router();

import { authMiddleware } from "../../middlewares/JWTAuthMiddleware";

import jobRoutes from "./jobs";
router.use("/job", authMiddleware, jobRoutes);

import applicationRoutes from "./applications";
router.use("/application", authMiddleware, applicationRoutes);

import usersRoutes from "./users";
router.use("/user", usersRoutes);

export default router;
