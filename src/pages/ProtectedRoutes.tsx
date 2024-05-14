import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/hooks";
import { getIsAuthenticated } from "@/store";

const ProtectedRoutes = () => {
  const isAuthenticated = useAppSelector(getIsAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
