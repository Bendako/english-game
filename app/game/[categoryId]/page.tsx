import { notFound } from 'next/navigation';
import { GameProvider } from '../../../contexts/GameContext';

// This would typically come from a database or API
const categories = ['1', '2', '3'];

interface PageProps {
  params: Promise<{ 
    categoryId: string 
  }>;
}

export default async function GamePage({ 
  params 
}: PageProps) {
  const resolvedParams = await params;
  
  // Validate category
  if (!categories.includes(resolvedParams.categoryId)) {
    notFound();
  }

  return (
    <GameProvider>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Game Page for Category {resolvedParams.categoryId}</h1>
        <p>Game logic will be implemented here</p>
      </div>
    </GameProvider>
  );
}
