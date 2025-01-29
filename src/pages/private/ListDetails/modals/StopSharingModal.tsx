import { useMutation } from "@tanstack/react-query";
import { Button } from "../../../../components/Button/Button";
import { Modal } from "../../../../components/Modal/Modal";
import {
  ShoppingList,
  stopSharingList,
} from "../../../../services/endpoints/lists";
import styles from "./stop-sharing-styles.module.css";
import toast from "react-hot-toast";
import { useAuthContext } from "../../../../hooks/useAuth";

type StopSharingModalProps = {
  list: ShoppingList;
  onCloseModal: () => void;
  isVisible: boolean;
  isOwner: boolean;
};

export const StopSharingModal: React.FC<StopSharingModalProps> = ({
  list,
  onCloseModal,
  isVisible,
  isOwner,
}) => {
  const { token } = useAuthContext();
  const mutation = useMutation({
    mutationFn: (id: string) => stopSharingList(id, token!),
    onMutate: () => {
      toast.loading("Dejando de compartir...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Lista dejando de compartir");
      onCloseModal();
    },
    onError: () => {
      toast.dismiss();
      toast.error("Error al dejar de compartir la lista");
    },
  });

  const handleStopSharing = () => {
    mutation.mutate(list.uuid);
  };

  return (
    <Modal
      title="Dejar de compartir"
      isOpen={isVisible}
      onClose={onCloseModal}
      maxWidth="450px"
      footer={
        <div className={styles.footer}>
          <Button
            text="Deja de compartir"
            variant="text"
            borderRadius="5px"
            backgroundColor="#D04242"
            hoverBackgroundColor="#F04242"
            border="none"
            onClick={handleStopSharing}
          />
          <Button
            text="Cancelar"
            variant="text"
            borderRadius="5px"
            backgroundColor="#353434"
            hoverBackgroundColor="#303030"
            border="1px solid #353434"
            onClick={() => onCloseModal()}
          />
        </div>
      }
    >
      <h2 className={styles.subtitle}>
        Deja de compartir <span> {list.name} </span>{" "}
      </h2>
      {isOwner ? (
        <p>
          Cuando dejes dejes de compartir esta lista, todos los miembros
          perderán acceso a ella.
        </p>
      ) : (
        <p>
          Si ya no desea utilizar esta lista, puede dejarla y la eliminaremos de
          su cuenta. El propietario de la lista seguirá teniendo acceso a ella.
        </p>
      )}
    </Modal>
  );
};
