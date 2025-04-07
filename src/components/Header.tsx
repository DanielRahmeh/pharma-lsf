import React from 'react';
import { Sun, Moon, Cross, HelpCircle, Menu, FileText } from 'lucide-react';
import { Theme, Page } from '../types';
import { useThemeClasses } from '../hooks/useThemeClasses';

interface HeaderProps {
  theme: Theme;
  currentPage: Page;
  onThemeChange: (theme: Theme) => void;
  onShowHelp: () => void;
  onShowPdf: () => void;
  onShowMenu: () => void;
  onPageChange: (page: Page) => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  currentPage,
  onThemeChange,
  onShowHelp,
  onShowPdf,
  onShowMenu,
  onPageChange,
}) => {
  const { getButtonClasses } = useThemeClasses(theme);

  const renderDesktopControls = () => (
    <div className="flex items-center gap-3">
      <button
        onClick={onShowHelp}
        className={`p-2.5 rounded-lg transition-colors duration-200 ${getButtonClasses()}`}
        aria-label="Aide"
      >
        <HelpCircle className="w-5 h-5" />
      </button>
      <button
        onClick={onShowPdf}
        className={`p-2.5 rounded-lg transition-colors duration-200 ${getButtonClasses()}`}
        aria-label="Guide PDF"
      >
        <FileText className="w-5 h-5" />
      </button>
      <div className={`h-6 w-px ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
      <div className={`flex gap-1 rounded-lg p-1 ${
        theme === 'dark' ? 'bg-gray-800' : theme === 'pharmacy' ? 'bg-white/50' : 'bg-gray-100'
      }`}>
        <button
          onClick={() => onThemeChange('light')}
          className={`p-2 rounded-md transition-all duration-200 ${getButtonClasses(theme === 'light')}`}
          aria-label="Mode jour"
        >
          <Sun className="w-5 h-5" />
        </button>
        <button
          onClick={() => onThemeChange('dark')}
          className={`p-2 rounded-md transition-all duration-200 ${getButtonClasses(theme === 'dark')}`}
          aria-label="Mode nuit"
        >
          <Moon className="w-5 h-5" />
        </button>
        <button
          onClick={() => onThemeChange('pharmacy')}
          className={`p-2 rounded-md transition-all duration-200 ${getButtonClasses(theme === 'pharmacy')}`}
          aria-label="Mode pharmacie"
        >
          <Cross className="w-5 h-5" />
        </button>
      </div>
    </div>
  );

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-lg ${
      theme === 'dark' 
        ? 'bg-gray-900/90 border-gray-800' 
        : theme === 'pharmacy'
          ? 'bg-white/80 border-green-100'
          : 'bg-white/90 border-gray-200'
    } border-b`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex-shrink-0">
              {currentPage !== 'home' && (
                <button
                  onClick={() => onPageChange('home')}
                  className={`flex items-center gap-2 font-medium transition-colors duration-200 ${getButtonClasses()}`}
                >
                  ← Retour
                </button>
              )}
            </div>
            <h1 className={`text-2xl font-bold tracking-tight ${
              theme === 'pharmacy' 
                ? 'bg-gradient-to-r from-blue-600 to-green-600 text-transparent bg-clip-text' 
                : theme === 'dark' 
                  ? 'text-white' 
                  : 'text-gray-900'
            }`}>
              {currentPage === 'home' ? 'Traducteur en Langue des Signes' :
               currentPage === 'pharmacy' ? 'Lexique Pharmacie LSF' :
               'Dictionnaire LSF'}
            </h1>
          </div>

          <div className="hidden md:block">
            {renderDesktopControls()}
          </div>

          <div className="md:hidden">
            <button
              onClick={onShowMenu}
              className={`p-2 rounded-lg transition-colors duration-200 ${getButtonClasses()}`}
              aria-label="Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};