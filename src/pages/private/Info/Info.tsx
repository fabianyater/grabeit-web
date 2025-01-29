import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router";
import { Button } from "../../../components/Button/Button";
import { Modal } from "../../../components/Modal/Modal";
import { useAuthContext } from "../../../hooks/useAuth";
import { acceptSharedLink } from "../../../services/endpoints/lists";
import styles from "./styles.module.css";

export const InfoPage = () => {
  const { token } = useAuthContext();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [searchParams] = useSearchParams();
  const username = searchParams.get("username");
  const listName = searchParams.get("listName");
  const listId = searchParams.get("listId");
  const sharedToken = searchParams.get("token");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => acceptSharedLink(sharedToken!, token!),
    onMutate: () => {
      toast.loading("Aceptando invitación...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Invitación aceptada con éxito");
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["lists", token] });
      navigate(`/lists/${listId}`);
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(error.message ?? "Error al aceptar la invitación");
      setIsOpen(false);
    },
  });

  const handleClose = () => {
    setIsOpen(false);
    navigate("/");
  };

  const handleAccept = () => {
    mutation.mutate();
  };

  return (
    <Modal
      title="Invitación a compartir lista"
      maxWidth="500px"
      isOpen={isOpen}
      onClose={handleClose}
    >
      <div className={styles.modalContent}>
        <p className={styles.message}>
          {username} quiere compartir la lista: <span>{listName}</span> contigo.
        </p>
        <div className={styles.buttons}>
          <Button
            variant="text"
            text="Aceptar"
            backgroundColor="#1c34bd"
            borderRadius="5px"
            border="none"
            onClick={handleAccept}
          />
          <Button
            size="medium"
            variant="text"
            text="Rechazar"
            backgroundColor="#1c1c1d"
            hoverBackgroundColor="#353434"
            borderRadius="5px"
            border="1px solid #464646"
            onClick={handleClose}
          />
        </div>
      </div>
    </Modal>
  );
};
