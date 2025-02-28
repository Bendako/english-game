"use client"

import React, { 
  createContext, 
  useState, 
  useContext, 
  ReactNode, 
  Dispatch, 
  SetStateAction 
} from 'react';
import { Category, GameState } from '../types/game';

// Initial game state
const initialGameState: GameState = {
  currentQuestion: undefined,
  score: 0,
  totalQuestions: 10,
  answeredQuestions: [],
  gameStatus: 'not_started',
  currentCategory: undefined
};

// Context type
type GameContextType = {
  gameState: GameState;
  setGameState: Dispatch<SetStateAction<GameState>>;
  startGame: (category: Category) => void;
  answerQuestion: (isCorrect: boolean) => void;
  endGame: () => void;
};

// Create context
const GameContext = createContext<GameContextType | undefined>(undefined);

// Provider component
export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  // Start game with selected category
  const startGame = (category: Category) => {
    setGameState(() => ({
      ...initialGameState,
      gameStatus: 'in_progress',
      currentCategory: category
    }));
  };

  // Handle question answer
  const answerQuestion = (isCorrect: boolean) => {
    setGameState(prev => {
      // Increment score if answer is correct
      const newScore = isCorrect ? prev.score + 1 : prev.score;
      
      // Check if game is complete
      const isGameComplete = prev.answeredQuestions.length + 1 >= prev.totalQuestions;
      
      return {
        ...prev,
        score: newScore,
        answeredQuestions: [...prev.answeredQuestions, prev.currentQuestion!],
        gameStatus: isGameComplete ? 'completed' : 'in_progress'
      };
    });
  };

  // End game and reset state
  const endGame = () => {
    setGameState(initialGameState);
  };

  return (
    <GameContext.Provider 
      value={{ 
        gameState, 
        setGameState, 
        startGame, 
        answerQuestion, 
        endGame 
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// Custom hook to use game context
export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
