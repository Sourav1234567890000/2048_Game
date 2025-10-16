import "./App.css";
import GridContainer from "./components/GridContainer";
import ButtonContainer from "./components/ButtonContainer";
import { useState, useEffect } from "react";
import DisplayScore from "./components/DisplayScore";
import GameHeading from "./components/GameHeading";

function App() {
  const [board, setBoard] = useState([
    [0, 2, 0, 2],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [2, 0, 0, 0],
  ]);
  const [score, setScore] = useState(0);

  function getRandomNumberFromSet() {
    const numbers = [2, 4];
    const randomIndex = Math.floor(Math.random() * numbers.length);
    return numbers[randomIndex];
  }

  function generateRandomNumber(newBoard) {
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
  }

  const upDownSlide = (col, direction = "up") => {
    const colCopy = [...col];
    let nonZero = colCopy.filter((val) => val !== 0);
    let gainedScore = 0;

    for (let i = 0; i < nonZero.length - 1; i++) {
      if (nonZero[i] === nonZero[i + 1]) {
        nonZero[i] = nonZero[i] * 2;
        gainedScore += nonZero[i];
        // remove merged tile
        nonZero[i + 1] = 0;
      }
    }
    nonZero = nonZero.filter((val) => val !== 0);

    const zeroesNeeded = colCopy.length - nonZero.length;
    const zeros = Array(zeroesNeeded).fill(0);

    const newCol =
      direction === "up" ? [...nonZero, ...zeros] : [...zeros, ...nonZero];

    if (gainedScore > 0) {
      setScore((prev) => prev + gainedScore);
    }
    return newCol;
  };

  const slideRow = (row, direction = "left") => {
    const rowCopy = [...row];
    let nonZero = rowCopy.filter((val) => val !== 0);
    let gainedScore = 0;

    for (let i = 0; i < nonZero.length - 1; i++) {
      if (nonZero[i] === nonZero[i + 1]) {
        nonZero[i] = nonZero[i] * 2;
        gainedScore += nonZero[i];
        // remove merged tile
        nonZero[i + 1] = 0;
      }
    }
    nonZero = nonZero.filter((val) => val !== 0);

    const zeroesNeeded = rowCopy.length - nonZero.length;
    const zeros = Array(zeroesNeeded).fill(0);

    const newRow =
      direction === "left" ? [...nonZero, ...zeros] : [...zeros, ...nonZero];

    if (gainedScore > 0) {
      setScore((prev) => prev + gainedScore);
    }

    return newRow;
  };

  const moveLeft = () => {
    let newBoard = board.map((row) => slideRow(row, "left"));
    generateRandomNumber(newBoard);
    setBoard(newBoard);
  };

  const moveRight = () => {
    let newBoard = board.map((row) => slideRow(row, "right"));
    generateRandomNumber(newBoard);
    setBoard(newBoard);
  };

  const moveDown = (event) => {
    const size = board.length;
    let newBoard = Array.from({ length: size }, () => Array(size).fill(0));

    for (let col = 0; col < size; col++) {
      let column = board.map((row) => row[col]);

      let newCol = upDownSlide(column, "down");

      for (let row = 0; row < size; row++) {
        newBoard[row][col] = newCol[row];
      }
    }
    generateRandomNumber(newBoard);

    setBoard(newBoard);
  };

  const moveUp = () => {
    const size = board.length;
    let newBoard = Array.from({ length: size }, () => Array(size).fill(0));

    for (let col = 0; col < size; col++) {
      let column = board.map((row) => row[col]);

      let newCol = upDownSlide(column, "up");

      for (let row = 0; row < size; row++) {
        newBoard[row][col] = newCol[row];
      }
    }
    generateRandomNumber(newBoard);

    setBoard(newBoard);
  };

  return (
    <>
      <GameHeading></GameHeading>
      <GridContainer score={score} board={board}></GridContainer>
      <ButtonContainer
        moveUp={moveUp}
        moveLeft={moveLeft}
        moveRight={moveRight}
        moveDown={moveDown}
      ></ButtonContainer>
    </>
  ); 
}

export default App;
