"use client"

import React from 'react';

type GameResultProps = {
  score: number;
  onBackToCategories: () => void;
  onRetryCategory: () => void;
};

const GameResult: React.FC<GameResultProps> = ({ 
  score, 
  onBackToCategories, 
  onRetryCategory 
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">סיכום המשחק</h2>
      <p className="text-xl mb-6">הניקוד הסופי שלך: {score}</p>
      <div className="flex space-x-4">
        <button 
          onClick={onBackToCategories}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          חזרה לקטגוריות
        </button>
        <button 
          onClick={onRetryCategory}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300"
        >
          נסה שוב
        </button>
      </div>
    </div>
  );
};

export default GameResult;
