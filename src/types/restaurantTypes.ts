interface IMenuItem {
  _id: string;
  name: string;
  price: number;
}

interface IRestaurant {
  _id: string;
  user: string;
  name: string;
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
  restaurants: IRestaurant[] | [];
  myRestaurant: IRestaurant | null;
  loading: boolean;
  error: string | null;
  message: string | null;
  total: number;
  page: number;
  pages: number;
}

interface IRestaurantsInitialState {
  restaurants: IRestaurant[] | [];
  results: null | number;
  page: number | null;
  loading: boolean;
  error: string | null;
}

export type {
  IMenuItem,
  IRestaurant,
  IRestaurantInitialState,
  IRestaurantsInitialState,
};
