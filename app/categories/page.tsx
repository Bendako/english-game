import Link from 'next/link';
import { Category } from '../../types/game';

// Mock categories - in a real app, these would come from a database or API
const categories: Category[] = [
  { id: '1', name: 'General English', description: 'Test your general English knowledge' },
  { id: '2', name: 'Vocabulary', description: 'Expand your English vocabulary' },
  { id: '3', name: 'Grammar', description: 'Challenge your grammar skills' },
];

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Select a Category</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Link 
            key={category.id} 
            href={`/game/${category.id}`} 
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
            <p className="text-gray-600">{category.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
