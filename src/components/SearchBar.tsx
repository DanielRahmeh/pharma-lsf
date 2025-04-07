import React from 'react';
import { Search } from 'lucide-react';
import { Theme } from '../types';
import { useThemeClasses } from '../hooks/useThemeClasses';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  theme: Theme;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, theme }) => {
  const { getInputClasses } = useThemeClasses(theme);

  return (
    <div className="relative my-8">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className={`w-5 h-5 ${
          theme === 'dark' 
            ? 'text-gray-400' 
            : theme === 'pharmacy' 
              ? 'text-green-600' 
              : 'text-gray-400'
        }`} />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Tapez un mot pour voir son signe..."
        className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all
          ${getInputClasses()}
          ${theme === 'pharmacy' 
            ? 'focus:ring-blue-200 focus:border-green-400' 
            : theme === 'dark' 
              ? 'focus:ring-gray-700' 
              : 'focus:ring-blue-200'}`}
      />
    </div>
  );
};