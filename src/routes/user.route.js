import { Router } from "express";
//
import verifyToken from "../middleware/token-verifier.js";
import * as userController from "../controllers/user.controller.js";

const router = Router();

router.use(verifyToken);

router.route("/:id").get(userController.getUser);

router.route("/:id").patch(userController.updateUser);

router.route("/").get(userController.getUsers);

export default router;
