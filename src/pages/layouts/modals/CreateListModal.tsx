// CreateListModal.tsx
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { Button } from "../../../components/Button/Button";
import { Input } from "../../../components/Input/Input";
import { Modal } from "../../../components/Modal/Modal";
import styles from "./styles.module.css";

type NewListFormData = {
  name: string;
};

type CreateListModalProps = {
  isOpen: boolean;
  onClose: () => void;
  register: UseFormRegister<NewListFormData>;
  handleSubmit: UseFormHandleSubmit<NewListFormData, undefined>;
  onSubmit: (data: NewListFormData) => void;
  onError: (errors: FieldErrors<NewListFormData>) => void;
};

export const CreateListModal = ({
  isOpen,
  onClose,
  register,
  handleSubmit,
  onSubmit,
  onError,
}: CreateListModalProps) => {
  return (
    <Modal title="Crear una nueva lista" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit, onError)} className={styles.form}>
        <Input
          type="text"
          placeholder="Nombre de la lista"
          register={register("name", {
            required: "Este campo es requerido",
          })}
        />
        <div className={styles.buttons}>
          <Button
            type="button"
            size="large"
            text="Cancelar"
            variant="text"
            backgroundColor="#1c1c1d"
            hoverBackgroundColor="#353434"
            borderRadius="5px"
            border="1px solid #464646"
            onClick={onClose}
          />
          <Button
            type="submit"
            size="large"
            text="Crear"
            variant="text"
            backgroundColor="#1c34bd"
            borderRadius="5px"
            border="none"
          />
        </div>
      </form>
    </Modal>
  );
};
