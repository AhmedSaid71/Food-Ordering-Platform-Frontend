import { IRestaurant, IUser } from "@/types";

export interface IOrdersInitialState {
  orders: IOrder[];
  loading: boolean;
  error: null | string;
}

export interface ICheckoutSessionRequest {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  restaurantId: string;
}

export interface ICheckoutSessionResponse {
  status: string;
  message: string;
  url: string;
}
export interface IGetOrdersResponse {
  status: string;
  data: {
    orders: IOrder[];
  };
}
export interface IOrder {
  _id: string;
  restaurant: IRestaurant;
  user: IUser;
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    name: string;
    addressLine1: string;
    city: string;
    email: string;
  };
  totalAmount: number;
  status: TOrderStatus;
  createdAt: string;
  restaurantId: string;
}
export type TOrderStatus =
  | "placed"
  | "paid"
  | "inProgress"
  | "outForDelivery"
  | "delivered";
