import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router";
import { SuggestionCard } from "../../../components/SuggestionCard/SuggestionCard";
import { useAuthContext } from "../../../hooks/useAuth";
import {
  createShoppingList,
  getSharedLinkInfo,
} from "../../../services/endpoints/lists";
import { suggestions } from "../../../utils/suggestions";
import styles from "./styles.module.css";

export const Home = () => {
  const { token } = useAuthContext();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const shareToken = searchParams.get("token");

  useEffect(() => {
    if (shareToken) {
      getSharedLinkInfo(shareToken, token!);
    }
  }, [shareToken, token]);

  const mutation = useMutation({
    mutationFn: (name: string) => createShoppingList(token!, name),
    onMutate: () => {
      toast.loading("Creando lista...");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
      toast.dismiss();
      toast.success("Lista creada con éxito");
    },
    onError: () => {
      toast.dismiss();
      toast.error("Error al crear la lista");
    },
  });

  const handleSuggestionSelect = (name: string) => {
    mutation.mutate(name);
  };

  return (
    <div className={styles.recommendations}>
      <h2>¡Planeemos tus compras!</h2>
      <p>Crea ua nueva o simplemente selecciona una de las listas sugeridas.</p>
      <div className={styles.suggestions}>
        {suggestions.map((suggestion) => (
          <SuggestionCard
            key={suggestion}
            name={suggestion}
            onSelect={handleSuggestionSelect}
          />
        ))}
      </div>
    </div>
  );
};
