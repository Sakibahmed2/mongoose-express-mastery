interface TFullName {
  firstName: string;
  lastName: string;
}

interface TAddress {
  street: string;
  city: string;
  country: string;
}

interface TOrders {
  productName: string;
  price: number;
  quantity: number;
}

export interface TUser {
  userId: string;
  username: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders?: TOrders[];
}
