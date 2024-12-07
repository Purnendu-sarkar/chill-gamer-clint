import React, { useState, useEffect } from "react";

const ColorCatcher = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [targetPosition, setTargetPosition] = useState({ top: 50, left: 50 });
  const [gameOver, setGameOver] = useState(false);

  // Move the target to a random position
  const moveTarget = () => {
    const top = Math.random() * 90;
    const left = Math.random() * 90;
    setTargetPosition({ top, left });
  };

  // Handle target click
  const handleTargetClick = () => {
    if (!gameOver) {
      setScore((prevScore) => prevScore + 1);
      moveTarget();
    }
  };

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setGameOver(true);
    }
  }, [timeLeft]);

  // Restart the game
  const restartGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    moveTarget();
  };

  return (
    <div className="relative w-full h-[700px] bg-gradient-to-br from-gray-800 to-black  text-white rounded-xl">
      <h1 className="absolute top-4 left-4 text-xl font-bold">
        Score: {score}
      </h1>
      <h1 className="absolute top-4 right-4 text-xl font-bold">
        Time Left: {timeLeft}s
      </h1>

      {gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70">
          <h2 className="text-4xl font-bold mb-4">Game Over</h2>
          <p className="text-2xl mb-6">Your Score: {score}</p>
          <button
            onClick={restartGame}
            className="px-6 py-3 bg-green-500 hover:bg-green-700 text-white rounded"
          >
            Restart Game
          </button>
        </div>
      )}

      {/* Target circle */}
      {!gameOver && (
        <div
          className="absolute w-16 h-16 bg-yellow-500 rounded-full shadow-lg cursor-pointer transition-transform transform hover:scale-110"
          style={{
            top: `${targetPosition.top}%`,
            left: `${targetPosition.left}%`,
            transform: "translate(-50%, -50%)",
          }}
          onClick={handleTargetClick}
        ></div>
      )}
    </div>
  );
};

export default ColorCatcher;
