import React, { useEffect, useState } from "react";
import { TbX } from "react-icons/tb";
import styles from "./styles.module.css";
import { Button } from "../Button/Button";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  maxWidth,
  isOpen,
  onClose,
  footer,
  children,
}) => {
  const styleVars = {
    "--custom-width": maxWidth,
  } as React.CSSProperties;
  const [isVisible, setIsVisible] = useState(false);

  const openModal = () => setIsVisible(true);
  const closeModal = () => setIsVisible(false);

  useEffect(() => {
    if (isOpen) {
      openModal();
    } else {
      const timer = setTimeout(closeModal, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div
      className={`${styles.overlay} ${!isOpen ? styles.hide : ""}`}
      onClick={onClose}
    >
      <div
        style={styleVars}
        className={`${styles.modal} ${!isOpen ? styles.hide : ""} ${
          maxWidth ? styles.customWidth : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h2>{title}</h2>
          <Button
            variant="iconOnly"
            icon={<TbX />}
            backgroundColor="transparent"
            borderRadius="10px"
            border="1px solid #353434"
            padding="3px"
            onClick={onClose}
            textColor="#919191"
            hoverBackgroundColor="#353434"
            iconSize="24px"
            className={styles.closeButton}
           />
        </div>
        <div className={styles.modalBody}>{children}</div>
        {footer && <div className={styles.modalFooter}>{footer}</div>}
      </div>
    </div>
  );
};
