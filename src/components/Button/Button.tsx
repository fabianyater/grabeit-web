import React from "react";
import styles from "./styles.module.css";

type ButtonVariant = "text" | "icon" | "iconOnly";
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps {
  variant: ButtonVariant;
  size?: ButtonSize;
  text?: string;
  icon?: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
  padding?: string;
  fontSize?: string;
  borderRadius?: string;
  border?: string;
  className?: string;
  hoverBackgroundColor?: string;
  iconSize?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  title?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant,
  size = "medium",
  text,
  icon,
  backgroundColor,
  textColor,
  padding,
  fontSize,
  borderRadius,
  border,
  className,
  hoverBackgroundColor,
  iconSize,
  onClick,
  type = "button",
  title,
}) => {
  const styleVars = {
    "--custom-bg-color": backgroundColor,
    "--custom-text-color": textColor,
    "--custom-padding": padding,
    "--custom-font-size": fontSize,
    "--custom-border-radius": borderRadius,
    "--custom-border": border,
    "--custom-hover-bg-color": hoverBackgroundColor,
    "--custom-icon-size": iconSize,
  } as React.CSSProperties;

  return (
    <button
      title={title ?? text}
      type={type}
      className={`${styles.button} ${
        variant === "text" ? styles.textButton : ""
      } ${variant === "iconOnly" ? styles.iconOnlyButton : ""} ${
        size ? styles[size] : ""
      } ${styles.customPadding} ${styles.customFontSize} ${
        styles.customBackground
      } ${styles.customTextColor} ${styles.customBorderRadius}
       ${styles.customBorder} ${styles.customHoverBackground}
       ${styles.customIconSize}
        ${className || ""}`}
      style={styleVars}
      onClick={onClick}
    >
      {icon && <>{icon}</>}
      {text && variant !== "iconOnly" && <span>{text}</span>}
    </button>
  );
};
