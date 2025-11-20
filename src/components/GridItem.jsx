import React from 'react';
import { Ghost, Skull } from 'lucide-react';

const GridItem = ({
  index,
  activeFlashIndex,
  gamePhase,
  mistakeIndex,
  playerMistakeIndex,
  handlePlayerClick,
  targetColor
}) => {
  const isFlashing = index === activeFlashIndex;
  
  // Base style for the grave/mound
  const baseStyle = "h-24 sm:h-32 w-full flex items-center justify-center border-4 border-gray-700 transition-all duration-150 ease-out rounded-lg shadow-inner";
  
  let dynamicStyle = "bg-gray-800";
  
  if (isFlashing) {
    // Currently showing the sequence
    dynamicStyle = "ring-4 ring-offset-4 ring-offset-gray-900 ring-green-500/70 shadow-green-500/50 scale-105";
  } else if (gamePhase === 'gameover') {
    if (index === mistakeIndex) {
      // The CORRECT tile the player missed
      dynamicStyle = "ring-4 ring-offset-4 ring-offset-gray-900 ring-green-500 shadow-green-500/50 scale-105 animate-pulse";
    } else if (index === playerMistakeIndex) {
      // The WRONG tile the player clicked
      dynamicStyle = "ring-4 ring-offset-4 ring-offset-gray-900 ring-red-500 shadow-red-500/50 scale-105";
    }
  }
  
  // Style for when it's the player's turn
  const playableStyle = (gamePhase === 'playing') 
    ? "cursor-pointer hover:bg-gray-700 active:scale-95" 
    : "cursor-not-allowed";

  return (
    <div 
      key={index}
      className={`${baseStyle} ${dynamicStyle} ${playableStyle}`}
      onClick={() => handlePlayerClick(index)}
    >
      {isFlashing || (gamePhase === 'gameover' && index === mistakeIndex) ? (
        // Show ghost for flashes or for the correct answer on game over
        <Ghost className={`h-12 w-12 sm:h-16 sm:w-16 ${targetColor} ${!isFlashing ? 'opacity-70' : 'animate-bounce'}`} />
      ) : (
        // Inactive tombstone placeholder
        <Skull className="h-8 w-8 text-gray-700" />
      )}
    </div>
  );
};

export default GridItem;