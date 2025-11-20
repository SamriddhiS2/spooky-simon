import React from 'react';
import GridItem from './GridItem.jsx';
import { TARGET_GRID_SIZE } from '../constants.js';

const Grid = ({ 
  activeFlashIndex, 
  gamePhase, 
  mistakeIndex, 
  playerMistakeIndex, 
  handlePlayerClick, 
  targetColor 
}) => {
  return (
    <div className="w-full max-w-xl mx-auto p-4 bg-gray-800 rounded-3xl shadow-2xl border-4 border-orange-500">
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {Array.from({ length: TARGET_GRID_SIZE }).map((_, index) => (
          <GridItem
            key={index}
            index={index}
            activeFlashIndex={activeFlashIndex}
            gamePhase={gamePhase}
            mistakeIndex={mistakeIndex}
            playerMistakeIndex={playerMistakeIndex}
            handlePlayerClick={handlePlayerClick}
            targetColor={targetColor}
          />
        ))}
      </div>
    </div>
  );
};

export default Grid;