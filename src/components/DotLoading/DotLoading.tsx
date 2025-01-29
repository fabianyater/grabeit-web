import styles from "./styles.module.css";

export const DotLoading = () => {
  return (
    <div className={styles.loading}>
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </div>
  );
};