import { Request, Response } from "express";
import userValidationSchema from "./users.validation";
import { UserServices } from "./users.services";

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    const zodParseData = userValidationSchema.parse(userData);

    const result = await UserServices.createUserIntoDB(zodParseData);

    res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User not created",
      error: {
        code: 404,
        description: "User crated failed!",
      },
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserFromDB();

    res.status(201).json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Users not found",
      error: {
        code: 404,
        description: "Users not found!",
      },
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.getSingleUserFromDB(userId);

    res.status(201).json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedData = req.body;
    const { userId } = req.params;
    const result = await UserServices.updateUserFromDB(userId, updatedData);
    res.status(201).json({
      success: true,
      message: "Users updated successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User updated failed",
      error: {
        code: 404,
        description: "User not updated!",
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await UserServices.deleteUserFromDb(userId);

    res.status(202).json({
      success: true,
      message: "User deleted successfully!",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User deleted failed",
      error: {
        code: 404,
        description: "User not deleted!",
      },
    });
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orderData = req.body;
    await UserServices.createOrderIntoUser(userId, orderData);

    res.status(202).json({
      success: true,
      message: "Order created successfully!",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Order create failed",
      error: {
        code: 404,
        description: "Order not created!",
      },
    });
  }
};

const getUserAllOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getAllOrderFromUser(userId);

    res.status(201).json({
      success: true,
      message: "Order fetched successfully!",
      data: {
        orders: result?.orders,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Order not found",
      error: {
        code: 404,
        description: "Order not found!",
      },
    });
  }
};

const calculateUserOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await UserServices.calculateUserOrder(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }

    if (!user.orders) {
      return res.json({
        success: true,
        message: "Total price calculated successfully!",
        data: {
          totalPrice: 0,
        },
      });
    }

    const totalOrderPrice = user.orders.reduce(
      (total, order) => total + order.price * order.quantity,
      0
    );

    res.status(201).json({
      success: true,
      message: "Total price calculated successfully!",
      data: {
        totalPrice: totalOrderPrice,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

export const UsersController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  createOrder,
  getUserAllOrders,
  calculateUserOrder,
};
