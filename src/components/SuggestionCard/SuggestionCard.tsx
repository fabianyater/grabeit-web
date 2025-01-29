import { Button } from "../Button/Button";
import styles from "./styles.module.css";

type SuggestionCardProps = {
  name: string;
  onSelect?: (name: string) => void;
};

export const SuggestionCard = ({ name, onSelect }: SuggestionCardProps) => {
  const handleClick = () => {
    if (onSelect) {
      onSelect(name);
    }
  };

  return (
    <Button
      variant="text"
      text={name}
      textColor="#fff"
      fontSize="1.2rem"
      className={styles.custom}
      size="large"
      backgroundColor="#000000"
      padding="1rem"
      border="1px solid #383838"
      borderRadius="3px"
      hoverBackgroundColor="#1c1c1d"
      onClick={handleClick}
    />
  );
};
