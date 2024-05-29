import * as express from "express";
import { authentification } from "../auth/middlewares/authentification";
import { authorization } from "../auth/middlewares/authorization";
import { AccountController } from "./controllers/account.controller";
const Router = express.Router();

Router.post(
  "/get_pagos",
  authentification,
  authorization(["admin"]),
  AccountController.getResult
);
export { Router as AccountRouter };