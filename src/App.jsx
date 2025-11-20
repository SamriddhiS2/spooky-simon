import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Info } from 'lucide-react';

// Import Constants
import { TARGET_GRID_SIZE, TUTORIAL_SEQUENCE } from './constants';

// Import Components
import Header from './components/Header';
import Stats from './components/Stats';
import Controls from './components/Controls';
import Grid from './components/Grid';
import TutorialModal from './components/TutorialModal';

const App = () => {
  const [level, setLevel] = useState(1);
  const [highScore, setHighScore] = useState(0); // Track best score
  const [isGameActive, setIsGameActive] = useState(false);
  
  // Game State
  const [sequence, setSequence] = useState([]); // The computer's sequence
  const [playerSequence, setPlayerSequence] = useState([]); // The player's inputs
  const [gamePhase, setGamePhase] = useState('start'); // 'start', 'showing', 'playing', 'gameover'
  const [activeFlashIndex, setActiveFlashIndex] = useState(null); // Which tile is currently flashing
  const [showTutorial, setShowTutorial] = useState(false); // For the tutorial modal
  
  // New State for Tutorial and Game Over
  const [isTutorialLevel, setIsTutorialLevel] = useState(false);
  const [mistakeIndex, setMistakeIndex] = useState(null); // The correct tile the player missed
  const [playerMistakeIndex, setPlayerMistakeIndex] = useState(null); // The wrong tile the player clicked
  
  const [message, setMessage] = useState("Remember the spooky sequence!");
  
  // Ref to hold timeout IDs for cleanup
  const timeoutRef = useRef(null);

  // Spooky color palette
  const bgColor = 'bg-gray-900';
  const accentColor = 'text-purple-400';
  const buttonColor = 'bg-purple-600 hover:bg-purple-700';
  const targetColor = 'text-green-400';
  
  // Handle cleanup on component unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  /**
   * Shows the next level's sequence to the player
   */
  const nextLevel = useCallback((currentLevel, isTutorial = false) => {
    setGamePhase('showing');
    
    // Determine sequence and speed based on tutorial or real game
    const isTut = isTutorial || currentLevel === 0;
    setMessage(isTut ? "Tutorial: Watch closely..." : `Level ${currentLevel}: Watch closely...`);
    
    const sequenceLength = isTut ? TUTORIAL_SEQUENCE.length : currentLevel + 1;
    const newSequence = [];
    
    if (isTut) {
      newSequence.push(...TUTORIAL_SEQUENCE);
    } else {
      for (let i = 0; i < sequenceLength; i++) {
          newSequence.push(Math.floor(Math.random() * TARGET_GRID_SIZE));
      }
    }
    
    setSequence(newSequence);
    setPlayerSequence([]); // Reset player's input

    // Tutorial is very slow, real game gets faster
    const flashDuration = isTut ? 1000 : Math.max(200, 600 - (currentLevel * 25));
    const flashPause = isTut ? 500 : Math.max(100, 250 - (currentLevel * 10));

    // This function recursively shows each flash in the sequence
    const showFlash = (index) => {
      if (index >= newSequence.length) {
        // Finished showing the sequence
        setActiveFlashIndex(null);
        setGamePhase('playing');
        setMessage(isTut ? 'Tutorial: Your turn!' : 'Your turn! Repeat the pattern.');
        return;
      }

      const flashIndex = newSequence[index];
      setActiveFlashIndex(flashIndex); // Turn on flash

      // Turn off flash after a delay
      timeoutRef.current = setTimeout(() => {
        setActiveFlashIndex(null); 
        // Pause briefly, then show the next flash
        timeoutRef.current = setTimeout(() => {
          showFlash(index + 1);
        }, flashPause); // Use dynamic pause
      }, flashDuration); // Use dynamic duration
    };

    // Start showing the sequence after a 1s delay
    timeoutRef.current = setTimeout(() => showFlash(0), 1000);
  }, []); // Setters from useState are stable

  /**
   * Ends the game
   */
  const endGame = useCallback(() => {
    setIsGameActive(false);
    setGamePhase('gameover');
    
    if (isTutorialLevel) {
      setMessage("Oops! Try the tutorial again.");
      setIsTutorialLevel(false); // Reset
      setLevel(1); // Reset for real game
    } else {
      setMessage(`Game Over! You reached level ${level}.`);
      if (level > highScore) {
        setHighScore(level);
      }
    }

    // Clear any pending timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, [highScore, level, isTutorialLevel]);

  /**
   * Starts a new game (or the tutorial)
   */
  const startGame = (isTutorial = false) => {
    setIsTutorialLevel(isTutorial);
    const startLevel = isTutorial ? 0 : 1;
    
    setLevel(startLevel);
    setSequence([]);
    setPlayerSequence([]);
    setMistakeIndex(null); // Clear mistakes
    setPlayerMistakeIndex(null); // Clear mistakes
    setIsGameActive(true);
    setGamePhase('showing'); // Immediately start showing
    nextLevel(startLevel, isTutorial); // Start level
  };
  
  /**
   * Handles the player clicking on a grid item
   */
  const handlePlayerClick = (index) => {
    if (gamePhase !== 'playing' || !isGameActive) {
      return;
    }

    const newPlayerSequence = [...playerSequence, index];
    setPlayerSequence(newPlayerSequence);

    // Check if the current click is correct
    if (sequence[newPlayerSequence.length - 1] !== index) {
      // Wrong move!
      setMistakeIndex(sequence[newPlayerSequence.length - 1]); // Show correct tile
      setPlayerMistakeIndex(index); // Show player's wrong tile
      endGame();
      return;
    }

    // Check if the player has completed the sequence
    if (newPlayerSequence.length === sequence.length) {
      // Level Complete!
      
      if (isTutorialLevel) {
        // Finished tutorial
        setMessage("Great job! Now play for real.");
        setIsGameActive(false);
        setGamePhase('start');
        setIsTutorialLevel(false);
        setLevel(1); // Set level to 1 for the "Start Game" button
        return;
      }

      // Not tutorial, so advance to next level
      const nextLevelNum = level + 1;
      setLevel(nextLevelNum);
      setGamePhase('showing'); // Get ready to show the next sequence
      setMessage(`Level ${level} complete! Get ready...`);
      
      // Start the next level after a pause
      timeoutRef.current = setTimeout(() => nextLevel(nextLevelNum, false), 1500); 
    }
    // Otherwise, the click was correct, but the sequence isn't finished.
  };
  
  return (
    <div className={`min-h-screen ${bgColor} text-white flex flex-col items-center justify-center p-4 font-mono relative`}>
      
      {/* --- Tutorial Button (Top Right) --- */}
      <button
        onClick={() => setShowTutorial(true)}
        title="How to Play"
        className={`absolute top-4 right-4 flex items-center justify-center p-3 font-bold rounded-full text-white shadow-lg transform transition duration-300 ease-in-out bg-gray-600 hover:bg-gray-700 hover:scale-105 active:scale-95 z-10`}
      >
        <Info className="h-6 w-6" />
      </button>

      {/* Main Container: Spans width and centers content */}
      <div className="w-full max-w-7xl text-center flex flex-col items-center">
        <Header accentColor={accentColor} />
        
        <div className="w-full max-w-3xl">
            <Stats level={level} highScore={highScore} accentColor={accentColor} />
            
            <Controls
            isGameActive={isGameActive}
            gamePhase={gamePhase}
            isTutorialLevel={isTutorialLevel}
            level={level}
            message={message}
            buttonColor={buttonColor}
            startGame={startGame}
            endGame={endGame}
            />
        </div>

        <Grid
          activeFlashIndex={activeFlashIndex}
          gamePhase={gamePhase}
          mistakeIndex={mistakeIndex}
          playerMistakeIndex={playerMistakeIndex}
          handlePlayerClick={handlePlayerClick}
          targetColor={targetColor}
        />
      </div>

      <TutorialModal
        showTutorial={showTutorial}
        setShowTutorial={setShowTutorial}
        startGame={startGame}
        accentColor={accentColor}
        buttonColor={buttonColor}
      />
    </div>
  );
};

export default App;