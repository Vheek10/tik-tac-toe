import React, { useState, useRef } from "react";
import "./TicTacToe.css";
import circle_icon from "../../assets/circle.png";
import cross_icon from "../../assets/cross.png";

const TicTacToe = () => {
  let [board, setBoard] = useState(Array(9).fill(""));
  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let titleRef = useRef(null);

  const toggle = (num) => {
    if (lock || board[num] !== "") {
      return;
    }
    
    const newBoard = [...board];
    if (count % 2 === 0) {
      newBoard[num] = "x";
    } else {
      newBoard[num] = "o";
    }
    
    setBoard(newBoard);
    setCount(count + 1);
    checkWin(newBoard);
  };

  const checkWin = (currentBoard) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[b] === currentBoard[c]) {
        won(currentBoard[a]);
        return;
      }
    }
    
    // Check for draw
    if (!currentBoard.includes("") && !lock) {
        setLock(true);
        titleRef.current.innerHTML = "It's a Draw!";
    }
  };

  const won = (winner) => {
    setLock(true);
    if (winner === "x") {
      titleRef.current.innerHTML = `Congratulations: <img src=${cross_icon} /> Wins`;
    } else {
      titleRef.current.innerHTML = `Congratulations: <img src=${circle_icon} /> Wins`;
    }
  };

  const reset = () => {
    setLock(false);
    setBoard(Array(9).fill(""));
    setCount(0);
    titleRef.current.innerHTML = "Tic Tac Toe";
  };

  return (
    <div className="container">
      <h1 className="title" ref={titleRef}>
        Tic Tac Toe
      </h1>
      <div className="board">
        {board.map((cell, index) => (
          <div
            className="boxes"
            key={index}
            onClick={() => toggle(index)}
          >
            {cell === "x" && <img src={cross_icon} alt="X" />}
            {cell === "o" && <img src={circle_icon} alt="O" />}
          </div>
        ))}
      </div>
      <button className="reset" onClick={reset}>
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;


