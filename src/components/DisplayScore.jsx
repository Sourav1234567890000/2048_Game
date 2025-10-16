import styles from "./DisplayScore.module.css";

const DisplayScore = ({ score }) => {
  return (
    <>
      <div className={styles.scoreContainer}>
        <div className={styles.label}>Score</div>
        <div className={styles.box}>
          {score >= 2048 ? "🎉 Winner!" : score}</div>
      </div>
    </>
  );
};

export default DisplayScore;
