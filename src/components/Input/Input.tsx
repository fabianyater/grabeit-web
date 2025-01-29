import styles from "./styles.module.css";
import { UseFormRegisterReturn } from "react-hook-form";

type InputProps = {
  type: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register?: UseFormRegisterReturn;
  customClass?: string;
};

export const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  onChange,
  register,
  customClass,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      className={`${styles.input} ${customClass}`}
      {...register}
    />
  );
};
