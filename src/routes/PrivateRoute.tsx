import { Navigate, useLocation } from "react-router";
import { Loader } from "../components/Loader/Loader";
import { useAuthContext } from "../hooks/useAuth";

type PrivateRouteProps = {
  children: React.ReactNode;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { token, isLoading } = useAuthContext();
  const location = useLocation();

  if (isLoading) {
    return <Loader />;
  }

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
