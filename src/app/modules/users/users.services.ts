import { TUser } from "./users.interface";
import { Users } from "./users.model";

const createUserIntoDB = async (userData: TUser) => {
  const result = await Users.create(userData);

  return result;
};

const getAllUserFromDB = async () => {
  const result = await Users.find(
    {},
    { username: 1, fullName: 1, age: 1, email: 1, address: 1 }
  );

  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const result = await Users.findById(id, { password: 0 });

  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
};
