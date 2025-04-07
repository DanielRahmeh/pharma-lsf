import { Theme } from '../types';

export const useThemeClasses = (theme: Theme) => {
  const getCardClasses = () => {
    switch (theme) {
      case 'dark':
        return 'bg-gray-800/80 backdrop-blur-sm shadow-lg hover:bg-gray-700/80 group';
      case 'pharmacy':
        return 'bg-gradient-to-br from-blue-100/80 to-green-100/80 shadow-lg border border-green-200/50 backdrop-blur-sm hover:from-blue-200/80 hover:to-green-200/80 group';
      default:
        return 'bg-white/80 backdrop-blur-sm shadow-lg hover:bg-gray-50/80 group';
    }
  };

  const getInputClasses = () => {
    switch (theme) {
      case 'dark':
        return 'bg-gray-800 border-gray-700 text-white placeholder-gray-400';
      case 'pharmacy':
        return 'bg-white/80 border-green-300 focus:border-blue-500 backdrop-blur-sm';
      default:
        return 'bg-white border-gray-200 focus:border-blue-500';
    }
  };

  const getButtonClasses = (isActive: boolean = false) => {
    switch (theme) {
      case 'dark':
        return isActive 
          ? 'bg-gray-700 text-white shadow-lg' 
          : 'text-gray-300 hover:bg-gray-700/50';
      case 'pharmacy':
        return isActive 
          ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg' 
          : 'text-gray-600 hover:bg-blue-50';
      default:
        return isActive 
          ? 'bg-blue-50 text-blue-600 shadow-sm' 
          : 'text-gray-600 hover:bg-gray-100';
    }
  };

  const getFavoriteButtonClasses = (isFavorite: boolean) => {
    const baseClasses = 'absolute top-2 right-2 p-2 rounded-full z-10 transition-all duration-300 backdrop-blur-sm';
    switch (theme) {
      case 'dark':
        return `${baseClasses} ${
          isFavorite 
            ? 'bg-yellow-500/30 text-yellow-300' 
            : 'bg-gray-800/30 text-gray-300 hover:bg-gray-700/50'
        }`;
      case 'pharmacy':
        return `${baseClasses} ${
          isFavorite 
            ? 'bg-yellow-500/30 text-yellow-400' 
            : 'bg-white/30 text-gray-600 hover:bg-white/50'
        }`;
      default:
        return `${baseClasses} ${
          isFavorite 
            ? 'bg-yellow-100 text-yellow-400' 
            : 'bg-white/70 text-gray-400 hover:bg-gray-100'
        }`;
    }
  };

  return {
    getCardClasses,
    getInputClasses,
    getButtonClasses,
    getFavoriteButtonClasses,
  };
};