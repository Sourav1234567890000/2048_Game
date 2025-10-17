import styles from "./ButtonContainer.module.css";

const ButtonContainer = ({ moveUp, moveDown, moveLeft, moveRight, restart }) => {
  return (
    <>
      <button className={styles.restart} 
      onClick={(e) => restart(e)}
      >Restart</button>
      <div className={styles.butContainer}>
        <button className={styles.but} onClick={(e) => moveUp(e)}>
          &uarr; W
        </button>
        <button className={styles.but} onClick={(e) => moveDown(e)}>
          &darr; S
        </button>
        <button className={styles.but} onClick={(e) => moveLeft(e)}>
          &larr; A
        </button>
        <button className={styles.but} onClick={(e) => moveRight(e)}>
          &rarr; D
        </button>
      </div>
    </>
  );
};

export default ButtonContainer;
