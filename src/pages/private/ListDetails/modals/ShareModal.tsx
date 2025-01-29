import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../../../../components/Button/Button";
import { CollaboratorItem } from "../../../../components/CollaboratorItem/CollaboratorItem";
import { Modal } from "../../../../components/Modal/Modal";
import { ShareOptions } from "../../../../components/ShareOptions/ShareOptions";
import { useAuthContext } from "../../../../hooks/useAuth";
import { ShoppingList } from "../../../../services/endpoints/lists";
import { StopSharingModal } from "./StopSharingModal";
import styles from "./styles.module.css";

type ShareModalProps = {
  list: ShoppingList;
  shareLink: string;
  listName: string;
  isVisible: boolean;
  onClose: () => void;
};

export const ShareModal: React.FC<ShareModalProps> = ({
  list,
  shareLink,
  listName,
  isVisible,
  onClose,
}) => {
  const [isVisibleStopSharing, setIsVisibleStopSharing] = useState(false);
  const { user } = useAuthContext();

  const handleCopyShareLink = () => {
    if (!shareLink)
      return toast.error("No se pudo generar el enlace para compartir.");
    navigator.clipboard
      ?.writeText(shareLink)
      .then(() => toast.success("Enlace copiado al portapapeles"))
      .catch(() => toast.error("No se pudo copiar el enlace al portapapeles."));
  };

  const handleShareLink = (option: string) => {
    const message = `Hola, quiero compartir mi lista de compras contigo. Te invito a visitar mi enlace: ${shareLink}`;
    switch (option) {
      case "WhatsApp":
        window.open(
          `https://wa.me/?text=${encodeURIComponent(message)}`,
          "_blank"
        );
        break;
      case "Copiar":
        handleCopyShareLink();
        break;
      case "Email":
        window.open(`mailto:?subject=GrabIt&body=${message}`, "_blank");
        break;
      default:
        toast.error("Opción no soportada");
    }
  };

  const owner = list.collaborators.find((c) => c.isOwner);
  const sharedCollaborators = list.collaborators.filter((c) => !c.isOwner);
  const isOwner = owner?.email === user?.email;

  return (
    <>
      <Modal
        title={`Compartir ${listName}`}
        maxWidth="500px"
        isOpen={isVisible}
        onClose={onClose}
        footer={<ShareOptions onShare={handleShareLink} />}
      >
        <article className={styles.modalContent}>
          <section className={styles.body}>
            {owner && !isOwner && (
              <CollaboratorItem
                collaborator={owner}
                isCurrentUser={owner.email === user?.email}
              />
            )}
            {sharedCollaborators.length > 0 && (
              <div className={styles.friend}>
                <h4>
                  Compartido con {sharedCollaborators.length} persona
                  {sharedCollaborators.length > 1 && "s"}
                </h4>
                {sharedCollaborators.map((collaborator) => (
                  <CollaboratorItem
                    key={collaborator.id}
                    collaborator={collaborator}
                    isCurrentUser={collaborator.email === user?.email}
                  />
                ))}
                <div className={styles.stopSharing}>
                  <Button
                    text="Deja de compartir esta lista"
                    variant="text"
                    borderRadius="5px"
                    backgroundColor="transparent"
                    hoverBackgroundColor="#353434"
                    border="1px solid #464646"
                    onClick={() => setIsVisibleStopSharing(true)}
                    padding="10px 20px"
                    fontSize=".870rem"
                  />
                </div>
              </div>
            )}
            {isOwner && sharedCollaborators.length === 0 && (
              <p>No hay usuarios compartidos.</p>
            )}
          </section>
        </article>
      </Modal>
      {isVisibleStopSharing && (
        <StopSharingModal
          list={list}
          isVisible={isVisibleStopSharing}
          onCloseModal={() => setIsVisibleStopSharing(false)}
          isOwner={isOwner}
        />
      )}
    </>
  );
};
