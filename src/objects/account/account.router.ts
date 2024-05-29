import * as express from "express";
import { authentification } from "../auth/middlewares/authentification";
import { authorization } from "../auth/middlewares/authorization";
import { AccountController } from "./controllers/account.controller";
const Router = express.Router();

/**
 * Request with autorization
 */
Router.post(
  "/getPagos",
  authentification,
  authorization(["admin"]),
  AccountController.getResult
);
export { Router as AccountRouter };