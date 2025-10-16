import DisplayScore from "./DisplayScore";
import styles from "./GridContainer.module.css";
// import ''; // Import your CSS file

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
    <div className={styles.boardWrapper}>
      <div className={styles.gridContainer}>
        {board.map((row, rowIndex) =>
          row.map((tile, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={styles.gridItem}
              style={{
                backgroundColor: getTileColor(tile),
                color: tile > 4 ? "#f9f6f2" : "#776e65", // light text for big tiles
              }}
            >
              {tile !== 0 ? tile : "-"}
            </div>
          ))
        )}
        <DisplayScore score={score}></DisplayScore>
      </div>
    </div>
  );
};

export default GridContainer;
