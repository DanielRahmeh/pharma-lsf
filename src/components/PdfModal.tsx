import React from 'react';
import { X, FileText, ExternalLink } from 'lucide-react';
import { Theme } from '../types';
import { useThemeClasses } from '../hooks/useThemeClasses';

interface PdfDocument {
  title: string;
  url: string;
  description: string;
}

interface PdfModalProps {
  theme: Theme;
  onClose: () => void;
  pdfs: PdfDocument[];
}

export const PdfModal: React.FC<PdfModalProps> = ({ theme, onClose, pdfs }) => {
  const { getButtonClasses } = useThemeClasses(theme);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className={`relative w-full max-w-2xl rounded-2xl shadow-xl ${
        theme === 'dark'
          ? 'bg-gray-800'
          : theme === 'pharmacy'
            ? 'bg-white'
            : 'bg-white'
      }`}>
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-lg ${getButtonClasses()}`}
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <h2 className={`text-2xl font-bold mb-6 ${
            theme === 'dark'
              ? 'text-white'
              : theme === 'pharmacy'
                ? 'text-blue-700'
                : 'text-gray-900'
          }`}>
            Documents PDF
          </h2>

          <div className="space-y-4">
            {pdfs.map((pdf, index) => (
              <a
                key={index}
                href={pdf.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block p-4 rounded-xl transition-all duration-200 ${
                  theme === 'dark'
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : theme === 'pharmacy'
                      ? 'bg-blue-50 hover:bg-blue-100'
                      : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${
                    theme === 'dark'
                      ? 'bg-gray-600'
                      : theme === 'pharmacy'
                        ? 'bg-blue-100'
                        : 'bg-white'
                  }`}>
                    <FileText className={`w-6 h-6 ${
                      theme === 'dark'
                        ? 'text-blue-400'
                        : theme === 'pharmacy'
                          ? 'text-blue-600'
                          : 'text-blue-500'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-semibold ${
                        theme === 'dark'
                          ? 'text-white'
                          : theme === 'pharmacy'
                            ? 'text-blue-700'
                            : 'text-gray-900'
                      }`}>
                        {pdf.title}
                      </h3>
                      <ExternalLink className={`w-4 h-4 ${
                        theme === 'dark'
                          ? 'text-gray-400'
                          : theme === 'pharmacy'
                            ? 'text-blue-500'
                            : 'text-gray-500'
                      }`} />
                    </div>
                    <p className={`mt-1 text-sm ${
                      theme === 'dark'
                        ? 'text-gray-300'
                        : theme === 'pharmacy'
                          ? 'text-blue-600'
                          : 'text-gray-600'
                    }`}>
                      {pdf.description}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};