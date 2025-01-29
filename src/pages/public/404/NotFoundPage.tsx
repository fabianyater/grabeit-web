import { TbHome } from "react-icons/tb";
import { Button } from "../../../components/Button/Button";
import styles from "./styles.module.css";

export const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1>404</h1>
      <p>Mmmm... Parece que no hay nada aquí.</p>
      <p>
        Si estás seguro de que hay algo, puedes volver a iniciar sesión o
        visitar la página de inicio.
      </p>

      <p>
        <Button
          text="Volver a la página de inicio"
          variant="icon"
          icon={<TbHome />}
          backgroundColor="#1c1c1d"
          hoverBackgroundColor="#353434"
          borderRadius="5px"
          border="1px solid #919191"
          size="large"
          iconSize="18px"
          onClick={() => {
            window.location.href = "/login";
          }}
        />
      </p>
    </div>
  );
};
