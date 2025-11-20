import React from 'react';
import { Play, X } from 'lucide-react';

const TutorialModal = ({ showTutorial, setShowTutorial, startGame, accentColor, buttonColor }) => {
  if (!showTutorial) {
    return null;
  }

  return (
    <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 max-w-lg w-full rounded-2xl p-6 border-4 border-purple-500 shadow-2xl relative">
        <button 
          onClick={() => setShowTutorial(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="h-8 w-8" />
        </button>
        <h2 className={`text-4xl font-bold mb-4 ${accentColor}`}>
          How to Play
        </h2>
        <div className="text-left text-lg space-y-4 text-gray-300">
          <p>Welcome to <span className="font-bold text-white">Spooky Simon!</span></p>
          <ol className="list-decimal list-inside space-y-3">
            <li>Watch the ghosts flash in a sequence on the tombstones.</li>
            <li>When it's your turn, click the tombstones in the exact same order.</li>
            <li>Each level, the pattern gets longer and faster!</li>
            <li>See how many levels you can remember!</li>
          </ol>
          <p className="text-center font-bold text-lg text-orange-400 pt-4">Want to try it out?</p>
          <button
            onClick={() => {
              setShowTutorial(false);
              startGame(true); // Pass true to start tutorial
            }}
            className={`flex items-center w-full justify-center text-lg px-8 py-3 font-bold rounded-full text-white shadow-lg transform transition duration-300 ease-in-out ${buttonColor} hover:scale-105 active:scale-95`}
          >
            <Play className="h-5 w-5 mr-2" />
            Play Tutorial Level
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorialModal;