import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TbDotsVertical, TbPencil, TbPlus, TbShare } from "react-icons/tb";
import { useParams } from "react-router";
import { Button } from "../../../components/Button/Button";
import { Input } from "../../../components/Input/Input";
import { Loader } from "../../../components/Loader/Loader";
import { useAuthContext } from "../../../hooks/useAuth";
import {
  getList,
  getShoppingListItems,
  shareShoppingList,
  ShoppingList,
  ShoppingListItem,
  updateListName,
} from "../../../services/endpoints/lists";
import { ShareModal } from "./modals/ShareModal";
import styles from "./styles.module.css";

export const ListDetails = () => {
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const { id } = useParams();
  const { token } = useAuthContext();
  const queryClient = useQueryClient();
  const { data, isPending, isError } = useQuery<ShoppingList>({
    queryKey: ["list", id],
    queryFn: () => getList(id!, token!),
    refetchOnWindowFocus: false,
  });
  const [newName, setNewName] = useState(data?.name ?? "");
  const { data: items, isLoading: isItemsLoading } = useQuery<
    ShoppingListItem[]
  >({
    queryKey: ["items", id],
    queryFn: () => getShoppingListItems(id!, token!),
    refetchOnWindowFocus: false,
  });

  const mutation = useMutation({
    mutationFn: (id: number) => shareShoppingList(id, token!),
    onMutate: () => {
      toast.loading("Creando enlace de compartir...");
    },
    onSuccess: () => {
      localStorage.setItem("sharedList", JSON.stringify(data!));
      toast.dismiss();
      toast.success("Enlace de compartir creado con éxito");
      queryClient.invalidateQueries({ queryKey: ["list", id] });
      setIsShareModalOpen(true);
    },
    onError: () => {
      toast.dismiss();
      toast.error("Error al crear el enlace de compartir");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (name: string) => updateListName(id!, name, token!),
    onMutate: () => {
      toast.loading("Actualizando nombre de la lista...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Nombre de la lista actualizado con éxito");
    },
    onError: () => {
      toast.dismiss();
      toast.error("Error al actualizar el nombre de la lista");
    },
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleNameUpdate = () => {
    if (newName !== data?.name) {
      updateMutation.mutate(newName);
    }
  };

  const handleShare = (id: number) => {
    mutation.mutate(id);
  };

  useEffect(() => {
    if (data?.name) setNewName(data.name);
  }, [data]);

  if (isPending) return <Loader />;
  if (isError) return <h1>Error al cargar la lista</h1>;

  return (
    <div className={styles.container}>
      {isShareModalOpen && (
        <ShareModal
          list={data}
          shareLink={mutation.data ?? ""}
          listName={data?.name}
          isVisible={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}
      <section className={styles.content}>
        <header>
          <div className={styles.title}>
            <input
              title="Editar nombre de la lista"
              type="text"
              value={newName}
              onChange={handleNameChange}
              onBlur={handleNameUpdate}
              onKeyDown={(e) => e.key === "Enter" && handleNameUpdate()}
            />
            <TbPencil />
          </div>
          <div className={styles.options}>
            <Button
              title="Compartir lista"
              type="button"
              size="small"
              variant="iconOnly"
              backgroundColor="#1c1c1d"
              hoverBackgroundColor="#353434"
              borderRadius="50px"
              border="none"
              icon={<TbShare />}
              textColor="#919191"
              iconSize="18px"
              onClick={() => {
                handleShare(data?.id as number);
              }}
            />
            <Button
              title="Opciones"
              type="button"
              size="small"
              variant="iconOnly"
              backgroundColor="#1c1c1d"
              hoverBackgroundColor="#353434"
              borderRadius="50px"
              border="none"
              icon={<TbDotsVertical />}
              textColor="#919191"
              iconSize="18px"
            />
          </div>
        </header>
        <main className={styles.main}>
          <Input
            type="search"
            placeholder="Burcar producto"
            customClass={styles.input}
          />
          <section className={styles.products}>
            {isItemsLoading && <Loader />}
            {!isItemsLoading && items?.length === 0 && (
              <div className={styles.noProducts}>
                <h3>No hay productos en la lista</h3>
                <p>Agrega algunos para comenzar</p>
              </div>
            )}
            {items?.map((item) => (
              <div key={item.id} className={styles.product}>
                <img src={item.name} alt={item.name} />
              </div>
            ))}
          </section>
        </main>
      </section>
      <Button
        title="Agregar producto"
        variant="iconOnly"
        icon={<TbPlus />}
        backgroundColor="#1c34bd"
        borderRadius="50px"
        border="none"
        textColor="#919191"
        iconSize="18px"
        className={styles.addButton}
      />
    </div>
  );
};
