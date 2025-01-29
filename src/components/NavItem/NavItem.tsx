import { Link, useLocation } from "react-router";
import styles from "./styles.module.css";

type NavItemProps = {
  path: string;
  label: string;
  children?: React.ReactNode;
};

export const NavItem = ({ path, label, children }: NavItemProps) => {
  const location = useLocation();
  const isActive = (route: string) => location.pathname.includes(route);

  return (
    <li className={styles.container} data-active={isActive(path)}>
      <Link to={path} className={styles.link}>
        {children}
        <span>{label}</span>
      </Link>
    </li>
  );
};
