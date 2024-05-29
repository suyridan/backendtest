import * as express from "express";
import { MenuController } from "./controllers/menu.controller";
const Router = express.Router();

Router.get(
  "/getMenu",
  MenuController.getResult
);
export { Router as MenuRouter };