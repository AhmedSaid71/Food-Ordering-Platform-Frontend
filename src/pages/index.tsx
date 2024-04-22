import { lazy } from "react";

const Home = lazy(() => import("./Home"));
const Login = lazy(() => import("./Login"));
const Register = lazy(() => import("./Register"));
const Profile = lazy(() => import("./Profile"));
const ProtectedRoutes = lazy(() => import("./ProtectedRoutes"));
const Restaurant = lazy(() => import("./Restaurant"));

export { Home, Login, Register, Profile, ProtectedRoutes, Restaurant };
