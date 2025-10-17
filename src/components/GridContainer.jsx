import DisplayScore from "./DisplayScore";
import styles from "./GridContainer.module.css";

const GridContainer = ({ score, board }) => {
  const getTileColor = (num) => {
    switch (num) {
      case 0:
        return "#cdc1b4"; // empty tile
      case 2:
        return "#eee4da";
      case 4:
        return "#ede0c8";
      case 8:
        return "#f2b179";
      case 16:
        return "#f59563";
      case 32:
        return "#f67c5f";
      case 64:
        return "#f65e3b";
      case 128:
        return "#edcf72";
      case 256:
        return "#edcc61";
      case 512:
        return "#edc850";
      case 1024:
        return "#edc53f";
      case 2048:
        return "#edc22e";
      default:
        return "#3c3a32"; // for numbers > 2048
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <div className={styles.gridContainer}>
          {board.map((row, rowIndex) =>
            row.map((tile, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={styles.gridItem}
                style={{
                  backgroundColor: getTileColor(tile),
                  color: tile > 4 ? "#f9f6f2" : "#776e65",
                }}
              >
                {tile !== 0 ? tile : "-"}
              </div>
            ))
          )}
        </div>
      </div>
        <DisplayScore score={score} />

      <div className={styles.rightSection}>
        <h2>How to Play</h2>
        <p>
          Use <b>Arrow keys</b> or <b>W/A/S/D</b> to move tiles.
          <br />
          Combine tiles with the same number to merge them.
          <br />
          Each move spawns a new <b>2</b> or <b>4</b> tile.
          <br />
          Reach <b>2048</b> to win — no moves left means game over!
        </p>
      </div>
    </div>
  );
};

export default GridContainer;
