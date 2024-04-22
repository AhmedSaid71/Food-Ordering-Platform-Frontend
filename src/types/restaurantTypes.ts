interface IMenuItem {
  _id: string;
  name: string;
  price: number;
}

interface IRestaurant {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: IMenuItem[];
  imageUrl: string;
  lastUpdated: string;
}

interface IRestaurantInitialState {
  restaurant: IRestaurant | null;
  loading: boolean;
  error: string | null;
}

export type { IMenuItem, IRestaurant, IRestaurantInitialState };
