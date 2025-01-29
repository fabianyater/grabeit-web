import { useEffect } from "react";
import { useLocation } from "react-router";
import { useAuthContext } from "../../../hooks/useAuth";

export const ContinuePage = () => {
  const location = useLocation();
  const { setToken } = useAuthContext();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      setToken(token);

      window.location.href = "/";
    } else {
      window.location.href = "/login";
    }
  }, [location, setToken]);

  return <div>Procesando inicio de sesión...</div>;
};
