import { Navigate } from "react-router";
import { useAuthContext } from "../../../hooks/useAuth";
import GoogleIcon from "../../../utils/icons/GoogleIcon";
import styles from "./style.module.css";
import { Loader } from "../../../components/Loader/Loader";

export const LoginPage = () => {
  const { token, isLoading } = useAuthContext();

  if (isLoading) {
    return <Loader />
  }

  if (token) {
    return <Navigate to="/" replace />;
  }

  const handleGoogleLogin = () => {
    window.location.assign("http://localhost:8080/oauth2/authorization/google");
  };

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h1>Iniciar sesión en GrabIt!</h1>
        <p>¡Qué bueno verte! ¡Bienvenido! 😊</p>
        <button
          title="Continuar con Google"
          className={styles.button}
          onClick={handleGoogleLogin}
          aria-label="Continuar con Google"
        >
          <GoogleIcon className={styles.icon} />
          Continua con Google
        </button>
      </section>
      <section className={styles.section}>
        <h1>GrabIt!</h1>
        <p className={styles.subtitle}>
          Comienza a planificar, comienza a ahorrar
        </p>
        <p>
          Compra con una lista para comprar todo lo que necesites... y nada que
          no necesites, 😉
        </p>
      </section>
    </div>
  );
};
