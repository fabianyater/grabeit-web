import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createShoppingList } from "../services/endpoints/lists";
import { useAuthContext } from "./useAuth";

type NewListFormData = {
  name: string;
};

export const useCreateList = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { token } = useAuthContext();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm<NewListFormData>();

  const mutation = useMutation({
    mutationFn: (name: string) => createShoppingList(token!, name),
    onMutate: () => {
      toast.loading("Creando lista...");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
      setIsModalOpen(false);
      toast.dismiss();
      toast.success("Lista creada con éxito");
    },
    onError: () => {
      toast.dismiss();
      toast.error("Error al crear la lista");
    },
  });

  const onSubmit = (data: NewListFormData) => {
    mutation.mutate(data.name);
    reset();
  };

  const onError = (errors: FieldErrors<NewListFormData>) => {
    if (errors.name) {
      toast.error(errors.name.message ?? "Error en el formulario");
    }
  };

  return {
    isModalOpen,
    setIsModalOpen,
    register,
    handleSubmit,
    onSubmit,
    onError,
  };
};
