import { TOrders, TUser } from "./users.interface";
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

const updateUserFromDB = async (id: string, userData: TUser) => {
  const result = await Users.findByIdAndUpdate(id, userData);

  return result;
};

const deleteUserFromDb = async (id: string) => {
  const result = await Users.findByIdAndDelete(id);
  return result;
};

const createOrderIntoUser = async (id: string, orderData: TOrders) => {
  const result = await Users.findByIdAndUpdate(id, {
    $push: {
      orders: {
        productName: orderData.productName,
        price: orderData.price,
        quantity: orderData.quantity,
      },
    },
  });

  return result;
};

const getAllOrderFromUser = async (id: string) => {
  const result = await Users.findById(id);

  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserFromDB,
  deleteUserFromDb,
  createOrderIntoUser,
  getAllOrderFromUser,
};
