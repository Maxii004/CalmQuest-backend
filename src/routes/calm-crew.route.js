import { Router } from "express";
import verifyToken from "../middleware/token-verifier.js";
import calmCrewController from "../controllers/calm-crew.controller.js";

const router = Router();

router.use(verifyToken);

router.route("/").post(calmCrewController.addCalmCrewMessage);
//
router.route("/").get(calmCrewController.getCalmCrewMessages);
//
export default router;
