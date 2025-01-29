import { Collaborator } from "../../services/endpoints/lists";
import styles from "./styles.module.css";

type CollaboratorItemProps = {
  collaborator: Collaborator;
  isCurrentUser: boolean;
};

export const CollaboratorItem: React.FC<CollaboratorItemProps> = ({
  collaborator,
  isCurrentUser,
}) => (
  <div className={styles.collaborator}>
    <div>
      <img src={collaborator.avatarUrl} alt={`${collaborator.email} avatar`} />
      <span className={styles.email}>
        {collaborator.email}
        {isCurrentUser && <span>Tú</span>}
      </span>
    </div>
    <span className={styles.access} data-owner={collaborator.isOwner}>
      {collaborator.isOwner ? "Propietario" : "Compartido"}
    </span>
  </div>
);
