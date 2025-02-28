"use client"

import React from 'react';
import { CategoryType } from '@/types/game';

type CategorySelectionProps = {
  categories: CategoryType[];
  onSelectCategory: (category: CategoryType) => void;
  onBackToMenu: () => void;
};

const CategorySelection: React.FC<CategorySelectionProps> = ({ 
  categories, 
  onSelectCategory, 
  onBackToMenu 
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">בחר קטגוריה</h2>
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category)}
            className={`${category.color} p-4 rounded-lg flex flex-col items-center justify-center hover:opacity-90 transition duration-300`}
          >
            <span className="text-4xl mb-2">{category.icon}</span>
            <span className="text-lg font-semibold">{category.name}</span>
          </button>
        ))}
      </div>
      <button 
        onClick={onBackToMenu}
        className="mt-6 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
      >
        חזרה לתפריט הראשי
      </button>
    </div>
  );
};

export default CategorySelection;
