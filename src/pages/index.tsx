import { lazy } from "react";

const Home = lazy(() => import("./Home"));
const Login = lazy(() => import("./Login"));
const Register = lazy(() => import("./Register"));
const Profile = lazy(() => import("./Profile"));
const ProtectedRoutes = lazy(() => import("./ProtectedRoutes"));
const Restaurant = lazy(() => import("./Restaurant"));
const Restaurants = lazy(() => import("./Restaurants"));
const MyRestaurant = lazy(() => import("./MyRestaurant"));
const Orders = lazy(() => import("./Orders"));

export {
  Home,
  Login,
  Register,
  Profile,
  ProtectedRoutes,
  Restaurant,
  Restaurants,
  MyRestaurant,
  Orders,
};
