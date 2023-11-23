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

export const UsersController = {
  createUser,
};
