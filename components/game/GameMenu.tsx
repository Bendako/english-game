"use client"

import React from 'react';

type GameMenuProps = {
  onStartGame: () => void;
};

const GameMenu: React.FC<GameMenuProps> = ({ onStartGame }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">English Learning Game</h1>
      <button 
        onClick={onStartGame}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        התחל משחק
      </button>
    </div>
  );
};

export default GameMenu;
