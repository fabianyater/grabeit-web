import { useLocation } from "react-router";
import { Collaborator } from "../../services/endpoints/lists";
import { formattedDate } from "../../utils/dateFormat";
import styles from "./styles.module.css";

type ListCardProps = {
  title?: string;
  uuid: string;
  name: string;
  createdAt: string;
  numberOfItems: number;
  avatars: Collaborator[];
  onClick?: () => void;
};

export const ListCard = ({
  title,
  uuid,
  name,
  createdAt,
  numberOfItems,
  avatars,
  onClick,
}: ListCardProps) => {
  const location = useLocation();
  const isActive = (listId: string) => location.pathname.includes(listId);

  return (
    <article
      title={title}
      className={styles.card}
      onClick={onClick}
      data-active={isActive(uuid)}
    >
      <header className={styles.cardHeader}>
        <div className={styles.listInfo}>
          <h2>{name}</h2>
          <p>{formattedDate(createdAt)}</p>
        </div>
        <div className={styles.itemsInfo}>
          <h3>{numberOfItems}/10</h3>
        </div>
      </header>
      <section className={styles.cardBody} data-active={isActive(uuid)}>
        <ul className={styles.avatars}>
          {avatars?.map((avatar) => (
            <li key={avatar.id} className={styles.avatar} title={avatar.email}>
              <img src={avatar.avatarUrl} alt={`${avatar.fullName} avatar`} />
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};
