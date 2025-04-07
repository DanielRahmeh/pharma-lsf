import React from 'react';
import { BookOpen, Stethoscope } from 'lucide-react';
import { Theme, Page } from '../types';
import { useThemeClasses } from '../hooks/useThemeClasses';

interface HomePageProps {
  theme: Theme;
  onPageChange: (page: Page) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ theme, onPageChange }) => {
  const { getButtonClasses } = useThemeClasses(theme);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-8 md:py-0">
      <h1 className={`text-3xl md:text-5xl font-bold text-center mb-6 md:mb-8 leading-tight ${
        theme === 'dark' 
          ? 'text-white' 
          : theme === 'pharmacy'
            ? 'bg-gradient-to-r from-blue-600 to-green-600 text-transparent bg-clip-text'
            : 'text-gray-900'
      }`}>
        Bienvenue dans le<br className="md:hidden" /> Dictionnaire LSF
      </h1>
      
      <p className={`text-lg md:text-xl text-center mb-10 md:mb-12 max-w-2xl px-4 ${
        theme === 'dark'
          ? 'text-gray-300'
          : theme === 'pharmacy'
            ? 'text-blue-700'
            : 'text-gray-600'
      }`}>
        Découvrez notre collection complète de signes en Langue des Signes Française, 
        avec une section spécialisée pour la pharmacie.
      </p>

      <div className="grid grid-cols-1 gap-4 md:gap-6 w-full max-w-4xl px-4 md:px-8">
        <button
          onClick={() => onPageChange('all')}
          className={`group p-6 md:p-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] ${
            theme === 'dark'
              ? 'bg-gray-800 hover:bg-gray-700'
              : theme === 'pharmacy'
                ? 'bg-gradient-to-br from-blue-50 to-green-50 hover:from-blue-100 hover:to-green-100'
                : 'bg-white hover:bg-gray-50'
          } shadow-lg`}
        >
          <div className="flex flex-row md:flex-col items-center md:text-center gap-4 md:gap-0">
            <div className={`p-3 md:p-4 rounded-full mb-0 md:mb-4 ${
              theme === 'dark'
                ? 'bg-gray-700 group-hover:bg-gray-600'
                : theme === 'pharmacy'
                  ? 'bg-blue-100 group-hover:bg-blue-200'
                  : 'bg-blue-50 group-hover:bg-blue-100'
            }`}>
              <BookOpen className={`w-6 h-6 md:w-8 md:h-8 ${
                theme === 'dark'
                  ? 'text-blue-400'
                  : theme === 'pharmacy'
                    ? 'text-blue-600'
                    : 'text-blue-500'
              }`} />
            </div>
            <div className="flex-1 md:text-center">
              <h2 className={`text-xl md:text-2xl font-semibold mb-1 md:mb-2 ${
                theme === 'dark'
                  ? 'text-white'
                  : theme === 'pharmacy'
                    ? 'text-blue-700'
                    : 'text-gray-900'
              }`}>
                Dictionnaire Complet
              </h2>
              <p className={`text-sm md:text-base ${
                theme === 'dark'
                  ? 'text-gray-400'
                  : theme === 'pharmacy'
                    ? 'text-blue-600'
                    : 'text-gray-600'
              }`}>
                Accédez à tous les signes de notre dictionnaire LSF
              </p>
            </div>
          </div>
        </button>

        <button
          onClick={() => onPageChange('pharmacy')}
          className={`group p-6 md:p-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] ${
            theme === 'dark'
              ? 'bg-gray-800 hover:bg-gray-700'
              : theme === 'pharmacy'
                ? 'bg-gradient-to-br from-blue-50 to-green-50 hover:from-blue-100 hover:to-green-100'
                : 'bg-white hover:bg-gray-50'
          } shadow-lg`}
        >
          <div className="flex flex-row md:flex-col items-center md:text-center gap-4 md:gap-0">
            <div className={`p-3 md:p-4 rounded-full mb-0 md:mb-4 ${
              theme === 'dark'
                ? 'bg-gray-700 group-hover:bg-gray-600'
                : theme === 'pharmacy'
                  ? 'bg-green-100 group-hover:bg-green-200'
                  : 'bg-green-50 group-hover:bg-green-100'
            }`}>
              <Stethoscope className={`w-6 h-6 md:w-8 md:h-8 ${
                theme === 'dark'
                  ? 'text-green-400'
                  : theme === 'pharmacy'
                    ? 'text-green-600'
                    : 'text-green-500'
              }`} />
            </div>
            <div className="flex-1 md:text-center">
              <h2 className={`text-xl md:text-2xl font-semibold mb-1 md:mb-2 ${
                theme === 'dark'
                  ? 'text-white'
                  : theme === 'pharmacy'
                    ? 'text-green-700'
                    : 'text-gray-900'
              }`}>
                Lexique Pharmacie
              </h2>
              <p className={`text-sm md:text-base ${
                theme === 'dark'
                  ? 'text-gray-400'
                  : theme === 'pharmacy'
                    ? 'text-green-600'
                    : 'text-gray-600'
              }`}>
                Vocabulaire spécialisé pour le domaine pharmaceutique
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};