import express from "express";
import { UsersController } from "./users.controller";

const route = express.Router();

route.post("/create-user", UsersController.createUser);

route.get("/", UsersController.getAllUser);

route.get("/:id", UsersController.getSingleUser);

export const userRouter = route;
