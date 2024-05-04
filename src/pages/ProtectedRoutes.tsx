import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/hooks";
import { getAuthObj } from "@/store";

const ProtectedRoutes = () => {
  const { isAuthenticated } = useAppSelector(getAuthObj);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
