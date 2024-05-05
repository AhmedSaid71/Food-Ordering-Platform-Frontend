import { IMenuItem } from "./restaurantTypes";

interface ICartItem extends IMenuItem {
  quantity: number;
}
interface ICartInitialState {
  cart: ICartItem[];
  loading: boolean;
  error: null | string;
}

export type { ICartInitialState, ICartItem };
