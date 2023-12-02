import { Router } from "express";
//
import verifyToken from "../middleware/token-verifier.js";
import userController from "../controllers/user.controller.js";

const router = Router();

router.use(verifyToken);
//
router.route("/").get(userController.getUsers);
//
router.route("/:id").get(userController.getUser);
//
router.route("/:id").patch(userController.updateUser);
//
router.route("/:id/questionnaire").post(userController.addQuestionnaireAttempt);
//
router.route("/:id/questionnaire").get(userController.getQuestionnaireAttempts);
//
export default router;
