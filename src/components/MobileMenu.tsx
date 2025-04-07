import React from 'react';
import { Sun, Moon, Cross, HelpCircle, FileText, X } from 'lucide-react';
import { Theme } from '../types';
import { useThemeClasses } from '../hooks/useThemeClasses';

interface MobileMenuProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  onShowHelp: () => void;
  onShowPdf: () => void;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  theme,
  onThemeChange,
  onShowHelp,
  onShowPdf,
  onClose,
}) => {
  const { getButtonClasses } = useThemeClasses(theme);

  return (
    <div className={`fixed inset-0 z-50 md:hidden ${
      theme === 'dark'
        ? 'bg-gray-900/95'
        : theme === 'pharmacy'
          ? 'bg-white/95'
          : 'bg-white/95'
    } backdrop-blur-sm`}>
      <div className="p-4">
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className={`p-2 rounded-lg ${getButtonClasses()}`}
            aria-label="Fermer le menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => {
              onShowHelp();
              onClose();
            }}
            className={`flex items-center gap-3 p-4 rounded-xl w-full ${getButtonClasses()}`}
          >
            <HelpCircle className="w-5 h-5" />
            <span className="font-medium">Aide</span>
          </button>
          
          <button
            onClick={() => {
              onShowPdf();
              onClose();
            }}
            className={`flex items-center gap-3 p-4 rounded-xl w-full ${getButtonClasses()}`}
          >
            <FileText className="w-5 h-5" />
            <span className="font-medium">Documents PDF</span>
          </button>

          <div className={`h-px w-full my-2 ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
          }`} />

          <div className="space-y-2">
            <p className={`text-sm font-medium px-4 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Thème
            </p>
            <button
              onClick={() => onThemeChange('light')}
              className={`flex items-center gap-3 p-4 rounded-xl w-full ${getButtonClasses(theme === 'light')}`}
            >
              <Sun className="w-5 h-5" />
              <span className="font-medium">Mode jour</span>
            </button>
            
            <button
              onClick={() => onThemeChange('dark')}
              className={`flex items-center gap-3 p-4 rounded-xl w-full ${getButtonClasses(theme === 'dark')}`}
            >
              <Moon className="w-5 h-5" />
              <span className="font-medium">Mode nuit</span>
            </button>
            
            <button
              onClick={() => onThemeChange('pharmacy')}
              className={`flex items-center gap-3 p-4 rounded-xl w-full ${getButtonClasses(theme === 'pharmacy')}`}
            >
              <Cross className="w-5 h-5" />
              <span className="font-medium">Mode pharmacie</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};