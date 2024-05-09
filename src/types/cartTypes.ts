import { IMenuItem } from "./restaurantTypes";

interface ICartItem extends IMenuItem {
  quantity: number;
}
interface ICartInitialState {
  cart: ICartItem[];
  loading: boolean;
  error: null | string;
  restaurantId: string | null;
  restaurantName: string | null;
  differentId: boolean;
  // currentCartItem: null | ICartItem[];
  // currentCartItems: null | { restaurantId: string; items: ICartItem[] };
}

export type { ICartInitialState, ICartItem };
