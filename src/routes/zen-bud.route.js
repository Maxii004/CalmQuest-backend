import { Router } from "express";
import verifyToken from "../middleware/token-verifier.js";
import zenBudController from "../controllers/zen-bud.controller.js";

const router = Router();

router.use(verifyToken);

router.route("/").post(zenBudController.addZenBudMessage);
//
router.route("/:userId").post(zenBudController.addZenBudUserMessage);
//
router.route("/:userId").get(zenBudController.getZenBudConversation);
//
export default router;
