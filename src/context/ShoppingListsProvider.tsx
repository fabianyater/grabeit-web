import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ShoppingList } from "../services/endpoints/lists";

interface ShoppingListContextProps {
  sharedList: ShoppingList | undefined;
  setSharedList: (list: ShoppingList) => void;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const ShoppingListContext = createContext<
  ShoppingListContextProps | undefined
>(undefined);

interface ShoppingListProviderProps {
  children: React.ReactNode;
}

export const ShoppingListProvider = ({
  children,
}: ShoppingListProviderProps) => {
  const [sharedList, setSharedList] = useState<ShoppingList | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedList = localStorage.getItem("sharedList");

    if (storedList) {
      setSharedList(JSON.parse(storedList));
    }

    setIsLoading(false);
  }, []);

  const value = useMemo(
    () => ({
      sharedList,
      setSharedList,
      isLoading,
      setIsLoading,
    }),
    [sharedList, isLoading]
  );

  return (
    <ShoppingListContext.Provider value={value}>
      {children}
    </ShoppingListContext.Provider>
  );
};
