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
  lastUpdated: Date;
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
interface ICreateMyRestaurantResponse {
  status: string;
  message: string;
  data: { restaurant: IRestaurant };
}
interface IGetMyRestaurantResponse {
  status: string;
  data: { restaurant: IRestaurant };
}
interface IUpdateMyRestaurantResponse {
  status: string;
  message: string;
  data: { restaurant: IRestaurant };
}
interface IGetRestaurantResponse {
  status: string;
  data: { restaurant: IRestaurant };
}
interface IGetAllRestaurantsResponse {
  status: string;
  page: number;
  pages: number;
  total: number;
  data: { restaurants: IRestaurant[] };
}
export type {
  IMenuItem,
  IRestaurant,
  IRestaurantInitialState,
  IRestaurantsInitialState,
  ICreateMyRestaurantResponse,
  IGetMyRestaurantResponse,
  IUpdateMyRestaurantResponse,
  IGetAllRestaurantsResponse,
  IGetRestaurantResponse,
};
