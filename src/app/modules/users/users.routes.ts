import express from "express";
import { UsersController } from "./users.controller";

const route = express.Router();

route.post("/", UsersController.createUser);

route.get("/", UsersController.getAllUser);

route.get("/:userId", UsersController.getSingleUser);

route.put("/:userId", UsersController.updateUser);

route.delete("/:userId", UsersController.deleteUser);

route.put("/:userId/orders", UsersController.createOrder);

route.get("/:userId/orders", UsersController.getUserAllOrders);

route.get("/:userId/orders/total-price", UsersController.calculateUserOrder);

export const userRouter = route;
