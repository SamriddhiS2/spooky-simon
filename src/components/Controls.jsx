import React from 'react';
import { Play, Repeat } from 'lucide-react';

const Controls = ({ 
  isGameActive, 
  gamePhase, 
  isTutorialLevel, 
  level, 
  message, 
  buttonColor, 
  startGame, 
  endGame 
}) => {
  return (
    <div className="mb-8">
      <p className="text-xl font-semibold text-center h-8 mb-4">
        {!isGameActive && gamePhase === 'gameover' ? (isTutorialLevel ? "Oops! Try the tutorial again." : `Game Over! You reached level ${level}.`) : message}
      </p>
      
      {!isGameActive ? (
        <div className="flex justify-center items-center">
          <button
            onClick={() => startGame(false)} // Pass false to start real game
            className={`flex items-center mx-auto text-lg px-8 py-3 font-bold rounded-full text-white shadow-lg transform transition duration-300 ease-in-out ${buttonColor} hover:scale-105 active:scale-95`}
          >
            <Play className="h-5 w-5 mr-2" />
            {gamePhase === 'start' ? "Start Spooky Game" : "Play Again"}
          </button>
        </div>
      ) : (
         <button
          onClick={endGame} // Allow user to stop game
          className={`flex items-center mx-auto text-lg px-8 py-3 font-bold rounded-full text-white shadow-lg transform transition duration-300 ease-in-out bg-red-600 hover:bg-red-700 active:scale-95`}
        >
          <Repeat className="h-5 w-5 mr-2" />
          Stop Game
        </button>
      )}
    </div>
  );
};

export default Controls;