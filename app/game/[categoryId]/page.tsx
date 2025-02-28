import { notFound } from 'next/navigation';
import { GameProvider } from '../../../contexts/GameContext';

// This would typically come from a database or API
const categories = ['1', '2', '3'];

export default function GamePage({ 
  params 
}: { 
  params: { categoryId: string } 
}) {
  // Validate category
  if (!categories.includes(params.categoryId)) {
    notFound();
  }

  return (
    <GameProvider>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Game Page for Category {params.categoryId}</h1>
        <p>Game logic will be implemented here</p>
      </div>
    </GameProvider>
  );
}
