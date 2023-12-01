/**
 * @file Index route file
 */
import { Router } from "express";
import userRoute from "./user.route.js";
import authRoute from "./auth.route.js";
import calmCrewRoute from "./calm-crew.route.js";
import zenBudRoute from "./zen-bud.route.js";

const router = Router();
/**
 * All the default routes include here
 */
const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/calm-crew",
    route: calmCrewRoute,
  },
  {
    path: "/zen-bud",
    route: zenBudRoute,
  },
];
//
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
//
export default router;
