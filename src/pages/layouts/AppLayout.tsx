import { useQuery } from "@tanstack/react-query";
import {
  TbBell,
  TbLayout2,
  TbLogout,
  TbMoon,
  TbPlus,
  TbSettings,
  TbUser
} from "react-icons/tb";
import { Link, Outlet, useNavigate } from "react-router";
import { Button } from "../../components/Button/Button";
import { ListCard } from "../../components/ListCard/ListCard";
import { Loader } from "../../components/Loader/Loader";
import { NavItem } from "../../components/NavItem/NavItem";
import { useAuthContext } from "../../hooks/useAuth";
import { useCreateList } from "../../hooks/useCreateList";
import { getLists, ShoppingList } from "../../services/endpoints/lists";
import { CreateListModal } from "./modals/CreateListModal";
import styles from "./style.module.css";

const options = [
  {
    label: "Configuración",
    icon: <TbSettings />,
    onClick: () => {},
  },
  {
    label: "Cambiar tema",
    icon: <TbMoon />,
    onClick: () => {},
  },
];

export const AppLayout = () => {
  const { logout, token, user } = useAuthContext();
  const navigate = useNavigate();
  const {
    handleSubmit,
    onSubmit,
    onError,
    register,
    isModalOpen,
    setIsModalOpen,
  } = useCreateList();

  const { data, isPending, isError } = useQuery<ShoppingList[]>({
    queryKey: ["lists", token],
    queryFn: () => getLists(token!),
    refetchInterval: 30000,
    refetchOnWindowFocus: false,
  });

  return (
    <div className={styles.container}>
      <CreateListModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        onError={onError}
      />
      <aside>
        <header className={styles.header}>
          <div>
            <Link to="/" className={styles.logo}>
              <h1>GrabIt!</h1>
            </Link>
            <TbBell size={22} color="#d6d3d3" />
          </div>
          <nav>
            <ul>
              <NavItem path="profile" label={user?.email ?? "Perfil"}>
                <TbUser size={22} color="#d6d3d3" />
              </NavItem>
              <NavItem path="products" label="Productos">
                <TbLayout2 size={22} color="#d6d3d3" />
              </NavItem>
            </ul>
          </nav>
        </header>
        <section className={styles.lists}>
          <Button
            title="Crear lista"
            size="small"
            text="Crear lista"
            variant="text"
            icon={<TbPlus />}
            backgroundColor="#1c34bd"
            borderRadius="5px"
            border="none"
            fontSize="1rem"
            padding="10px"
            onClick={() => setIsModalOpen(true)}
          />
          <div className={styles.cards}>
            {isPending && <Loader />}
            {isError && <p>Error al cargar las listas.</p>}
            {data && data.length > 0
              ? data.map((list) => (
                  <ListCard
                    key={list.id}
                    title={list.name}
                    uuid={list.uuid}
                    name={list.name}
                    createdAt={list.createdAt}
                    numberOfItems={list.itemsCount}
                    avatars={list.collaborators}
                    onClick={() => navigate(`/lists/${list.uuid}`)}
                  />
                ))
              : !isPending && (
                  <div className={styles.noLists}>
                    <p>No hay listas disponibles.</p>
                  </div>
                )}
          </div>
        </section>
        <footer className={styles.footer}>
          <div className={styles.options}>
            {options.map((option) => (
              <Button
                key={option.label}
                variant="iconOnly"
                icon={option.icon}
                backgroundColor="transparent"
                borderRadius="50px"
                border="1px solid #353434"
                padding="10px"
                textColor="#919191"
                hoverBackgroundColor="#353434"
                iconSize="24px"
                className={styles.hover}
              />
            ))}
          </div>
          <Button
            variant="iconOnly"
            icon={<TbLogout />}
            backgroundColor="transparent"
            borderRadius="50px"
            border="1px solid #353434"
            padding="10px"
            onClick={() => {
              logout();
            }}
            textColor="#919191"
            hoverBackgroundColor="#353434"
            iconSize="24px"
            className={styles.hover}
          />
        </footer>
      </aside>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};
