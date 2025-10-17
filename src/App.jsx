import "./App.css";
import { useState, useEffect } from "react";

// Components (you can create simple components for GridContainer, ButtonContainer, DisplayScore, GameHeading)
import GridContainer from "./components/GridContainer";
import ButtonContainer from "./components/ButtonContainer";
import DisplayScore from "./components/DisplayScore";
import GameHeading from "./components/GameHeading";

function App() {
  const size = 4; 
  const getRandomNumberFromSet = () => (Math.random() < 0.9 ? 2 : 4);

  const createEmptyBoard = (boardSize) =>
    Array.from({ length: boardSize }, () => Array(boardSize).fill(0));

  const generateRandomNumber = (newBoard) => {
    const randomNumber = getRandomNumberFromSet();
    const emptyCells = [];
    newBoard.forEach((row, i) =>
      row.forEach((val, j) => {
        if (val === 0) emptyCells.push([i, j]);
      })
    );
    if (emptyCells.length > 0) {
      const [i, j] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      newBoard[i][j] = randomNumber;
    }
    return newBoard;
  };

  const initializeBoard = (boardSize) => {
    let newBoard = createEmptyBoard(boardSize);
    newBoard = generateRandomNumber(newBoard);
    newBoard = generateRandomNumber(newBoard);
    return newBoard;
  };

  const [board, setBoard] = useState(() => initializeBoard(size));
  const [score, setScore] = useState(0);

  const slideRow = (row, direction = "left") => {
    let nonZero = row.filter((val) => val !== 0);
    let gainedScore = 0;

    for (let i = 0; i < nonZero.length - 1; i++) {
      if (nonZero[i] === nonZero[i + 1]) {
        nonZero[i] *= 2;
        gainedScore += nonZero[i];
        nonZero[i + 1] = 0;
      }
    }
    nonZero = nonZero.filter((val) => val !== 0);
    const zeros = Array(row.length - nonZero.length).fill(0);

    if (direction === "left") nonZero = [...nonZero, ...zeros];
    else nonZero = [...zeros, ...nonZero];

    if (gainedScore > 0) setScore((prev) => prev + gainedScore);

    return nonZero;
  };

  const slideColumn = (col, direction = "up") => {
    let nonZero = col.filter((val) => val !== 0);
    let gainedScore = 0;

    for (let i = 0; i < nonZero.length - 1; i++) {
      if (nonZero[i] === nonZero[i + 1]) {
        nonZero[i] *= 2;
        gainedScore += nonZero[i];
        nonZero[i + 1] = 0;
      }
    }
    nonZero = nonZero.filter((val) => val !== 0);
    const zeros = Array(col.length - nonZero.length).fill(0);

    if (direction === "up") nonZero = [...nonZero, ...zeros];
    else nonZero = [...zeros, ...nonZero];

    if (gainedScore > 0) setScore((prev) => prev + gainedScore);

    return nonZero;
  };

  const moveLeft = () => {
    let newBoard = board.map((row) => slideRow(row, "left"));
    newBoard = generateRandomNumber(newBoard);
    setBoard(newBoard);
  };

  const moveRight = () => {
    let newBoard = board.map((row) => slideRow(row, "right"));
    newBoard = generateRandomNumber(newBoard);
    setBoard(newBoard);
  };

  const moveUp = () => {
    const newBoard = createEmptyBoard(size);
    for (let col = 0; col < size; col++) {
      const column = board.map((row) => row[col]);
      const newCol = slideColumn(column, "up");
      newCol.forEach((val, rowIndex) => {
        newBoard[rowIndex][col] = val;
      });
    }
    generateRandomNumber(newBoard);
    setBoard(newBoard);
  };

  const moveDown = () => {
    const newBoard = createEmptyBoard(size);
    for (let col = 0; col < size; col++) {
      const column = board.map((row) => row[col]);
      const newCol = slideColumn(column, "down");
      newCol.forEach((val, rowIndex) => {
        newBoard[rowIndex][col] = val;
      });
    }
    generateRandomNumber(newBoard);
    setBoard(newBoard);
  };

  const handleKeyDown = (e) => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key))
      e.preventDefault();

    switch (e.key) {
      case "ArrowUp":
      case "w":
      case "W":
        moveUp();
        break;
      case "ArrowDown":
      case "s":
      case "S":
        moveDown();
        break;
      case "ArrowLeft":
      case "a":
      case "A":
        moveLeft();
        break;
      case "ArrowRight":
      case "d":
      case "D":
        moveRight();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const restartGame = () => {
    setBoard(initializeBoard(size));
    setScore(0);
  };

  return (
    <>
      <GameHeading />
      <GridContainer board={board} score={score} />
      <ButtonContainer
        moveUp={moveUp}
        moveDown={moveDown}
        moveLeft={moveLeft}
        moveRight={moveRight}
        restart={restartGame}
      />
    </>
  );
}

export default App;
