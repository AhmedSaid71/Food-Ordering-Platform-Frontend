import { ICartItem, IRestaurant, IUser } from "@/types";
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
    orders: Order[];
  };
}
export interface Order {
  deliveryDetails: IDeliveryDetails;
  _id: string;
  restaurant: IRestaurant;
  user: IUser;
  cartItems: TCartItem[];
  status: string;
  totalAmount?: number;
}
export type TCartItem = {
  menuItemId: string;
  quantity: number;
  name: string;
  _id: string;
};
export interface IDeliveryDetails {
  email: string;
  name: string;
  addressLine1: string;
  city: string;
}
