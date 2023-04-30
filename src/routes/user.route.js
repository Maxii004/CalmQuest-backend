import { Router } from "express";
//
import * as userController from "../controllers/user.controller.js";

const router = Router();

router.route("/signup").post((req, res) => {
  userController.addUser(req, res);
});

router.route("/login").post((req, res) => {
  userController.loginUser(req, res);
});

router.route("/:id").get((req, res) => {
  userController.getUser(req, res);
});

router.route("/:id").patch((req, res) => {
  userController.updateUser(req, res);
});

export default router;
