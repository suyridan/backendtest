import cors from "cors";
import express, { Express } from "express";
import morgan from "morgan";
import { userRouter } from "./objects/auth/auth.router";
import { AccountRouter } from "./objects/account/account.router";
import { MenuRouter } from "./objects/menu/menu.router";
import AppDataSource from "./config/data.source";

// Create Express app
const app: Express = express();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
    cors({
      origin: true,
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
      credentials: true,
    })
    );
app.use("/auth", userRouter);
app.use("/api", [
    AccountRouter,
    MenuRouter
]);

export default app;