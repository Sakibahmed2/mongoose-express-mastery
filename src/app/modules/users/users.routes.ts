import express from "express";
import { UsersController } from "./users.controller";

const route = express.Router();

route.post("/create-user", UsersController.createUser);

export const userRouter = route;
