import { TbBrandWhatsapp, TbCopy, TbMail } from "react-icons/tb";
import { Button } from "../Button/Button";
import styles from "./styles.module.css";

export const ShareOptions: React.FC<{ onShare: (option: string) => void }> = ({
  onShare,
}) => (
  <footer className={styles.footer}>
    {[
      {
        icon: <TbCopy />,
        label: "Copiar enlace",
        option: "Copiar",
        color: "#353434",
      },
      {
        icon: <TbBrandWhatsapp />,
        label: "WhatsApp",
        option: "WhatsApp",
        color: "#22a54f",
      },
      { icon: <TbMail />, label: "Email", option: "Email", color: "#4797e0" },
    ].map(({ icon, label, option, color }) => (
      <div className={styles.option} key={option}>
        <Button
          variant="iconOnly"
          icon={icon}
          backgroundColor={color}
          borderRadius="50px"
          border="1px solid #353434"
          padding="10px"
          onClick={() => onShare(option)}
          textColor="#fff"
          hoverBackgroundColor={color}
          iconSize="24px"
        />
        <span>{label}</span>
      </div>
    ))}
  </footer>
);
