import { useAppSelector } from "@/hooks/useReduxHooks";
import { getAuthObj } from "@/store/authSlice";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { isAuthenticated } = useAppSelector(getAuthObj);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
