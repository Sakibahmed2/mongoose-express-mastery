import { Schema, model } from "mongoose";
import { TAddress, TFullName, TOrders, TUser } from "./users.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const fullNameSchema = new Schema<TFullName>({
  firstName: { type: String, required: [true, "First name is required"] },
  lastName: { type: String, required: [true, "Last name is required"] },
});

const addressSchema = new Schema<TAddress>({
  street: { type: String, required: [true, "Street is required"] },
  city: { type: String, required: [true, "City is required"] },
  country: { type: String, required: [true, "Country is required"] },
});

const ordersSchema = new Schema<TOrders>({
  productName: { type: String, required: [true, "Product name is required"] },
  price: { type: Number, required: [true, "Price is required"] },
  quantity: { type: Number, required: [true, "Quantity is required"] },
});

const userSchema = new Schema<TUser>({
  userId: {
    type: String,
    required: [true, "User ID is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
  },
  fullName: { type: fullNameSchema, required: [true, "Full name is required"] },
  age: { type: Number, required: [true, "Age is required"] },
  email: { type: String, required: [true, "Email is required"] },
  isActive: { type: Boolean, required: [true, "isActive is required"] },
  hobbies: [{ type: String }],
  address: { type: addressSchema, required: [true, "Address is required"] },
  orders: [{ type: ordersSchema }],
});

//pre save middleware / hook
userSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  //hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round)
  );
  next();
});

//pst save middleware / hook
userSchema.post("save", function (doc, next) {
  doc.password = "";

  next();
});

//
export const Users = model<TUser>("Users", userSchema);
