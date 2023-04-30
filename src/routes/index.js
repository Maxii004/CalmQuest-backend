/**
 * @file Index route file
 */
import { Router } from "express";
import userRoute from "./user.route.js";

const router = Router();
/**
 * All the default routes include here
 */
const defaultRoutes = [
  {
    path: "/users",
    route: userRoute,
  },
];
//
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
//
export default router;
