// Interfaces and types for game-related structures

export interface Question {
  id: string;
  text: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  correctAnswer: string;
  incorrectAnswers: string[];
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;  
}

export type GameState = {
  currentQuestion?: Question;
  score: number;
  totalQuestions: number;
  answeredQuestions: Question[];
  gameStatus: 'not_started' | 'in_progress' | 'completed';
  currentCategory?: Category;
}

export type UserPreferences = {
  language: string;
  soundEnabled: boolean;
  difficultyLevel: 'easy' | 'medium' | 'hard';
  theme: 'light' | 'dark';
}
