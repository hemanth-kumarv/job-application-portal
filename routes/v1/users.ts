import { Router } from "express";
const router = Router();

import { addUser } from "../../controllers/v1/users";
import { loginMiddleware } from "../../middlewares/JWTAuthMiddleware";

// POST
router.post("/login", loginMiddleware);
router.post("/", addUser);

export default router;
