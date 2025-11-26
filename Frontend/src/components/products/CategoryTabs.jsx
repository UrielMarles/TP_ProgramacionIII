import { BookOpen, Dice6 } from 'lucide-react';
import { CATEGORIES, CATEGORY_LABELS } from '../../utils/constants';

const CategoryTabs = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    {
      id: CATEGORIES.LIBRO,
      label: CATEGORY_LABELS[CATEGORIES.LIBRO].plural,
      icon: BookOpen,
    },
    {
      id: CATEGORIES.JUEGO,
      label: CATEGORY_LABELS[CATEGORIES.JUEGO].plural,
      icon: Dice6,
    },
  ];

  return (
    <div className="flex justify-center mb-8 animate-fadeIn">
      <div className="inline-flex bg-white dark:bg-gray-800 rounded-xl shadow-lg p-2 space-x-2">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform ${
                isActive
                  ? 'bg-gradient-to-r from-primary-500 to-primary-700 text-white shadow-lg scale-105'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{category.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryTabs;