import { Router } from "express";
import loginLimiter from "../middleware/login-limiter.js";
import * as authController from "../controllers/auth.controller.js";

const router = Router();
//
router.route("/signup").post(authController.signUp);
//
router.route("/login").post(loginLimiter, authController.login);
//
router.route("/refresh").get(authController.refresh);
//
router.route("/logout").get(authController.logout);
//
export default router;
