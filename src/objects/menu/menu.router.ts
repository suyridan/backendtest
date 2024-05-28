import * as express from "express";
import { authentification } from "../auth/middlewares/authentification";
import { authorization } from "../auth/middlewares/authorization";
import { MenuController } from "./controllers/menu.controller";
const Router = express.Router();

Router.get(
  "/getMenu",
  // authentification,
  // authorization(["admin"]),
  MenuController.getResult
);
export { Router as MenuRouter };