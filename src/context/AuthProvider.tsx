import { jwtDecode } from "jwt-decode";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Loader } from "../components/Loader/Loader";
import { useNavigate } from "react-router";

interface DecodedToken {
  username?: string;
  email?: string;
  exp?: number;
  [key: string]: unknown;
}

interface AuthContextProps {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  user: DecodedToken | null;
  logout: VoidFunction;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
  
    if (storedToken) {
      try {
        const decoded = jwtDecode<DecodedToken>(storedToken);
        const isTokenExpired = decoded.exp ? decoded.exp * 1000 < Date.now() : false;
  
        if (isTokenExpired) {
          console.log("Token expirado");
          logout();
        } else {
          setToken(storedToken);
          setUser(decoded);
        }
      } catch (error) {
        console.log("Error decodificando el token:", error);
        logout();
      }
    }
  
    setIsLoading(false);
  }, []);

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  const value = useMemo(
    () => ({
      token,
      setToken,
      user,
      logout,
      isLoading,
      setIsLoading,
    }),
    [token, setToken, user, isLoading, setIsLoading]
  );

  if (isLoading) {
    return <Loader />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
