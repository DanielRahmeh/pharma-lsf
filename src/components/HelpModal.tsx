import React from 'react';
import { X } from 'lucide-react';
import { Theme } from '../types';
import { useThemeClasses } from '../hooks/useThemeClasses';

interface HelpModalProps {
  theme: Theme;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ theme, onClose }) => {
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
            Aide et Instructions
          </h2>

          <div className="space-y-6">
            <section>
              <h3 className={`text-lg font-semibold mb-2 ${
                theme === 'dark'
                  ? 'text-white'
                  : theme === 'pharmacy'
                    ? 'text-blue-600'
                    : 'text-gray-900'
              }`}>
                Gestion des Vidéos
              </h3>
              <div className="space-y-4">
                <p className={`${
                  theme === 'dark'
                    ? 'text-gray-200'
                    : theme === 'pharmacy'
                      ? 'text-gray-700'
                      : 'text-gray-700'
                }`}>
                  Pour ajouter ou modifier des vidéos dans l'application :
                </p>
                <div className={`rounded-lg p-4 font-mono text-sm ${
                  theme === 'dark'
                    ? 'bg-gray-700 text-gray-200'
                    : theme === 'pharmacy'
                      ? 'bg-blue-50 text-gray-700'
                      : 'bg-gray-100 text-gray-700'
                }`}>
                  <p className="mb-2">1. Ouvrez le fichier <code>src/App.tsx</code></p>
                  <p className="mb-2">2. Localisez les constantes :</p>
                  <ul className="list-none space-y-1 ml-4">
                    <li>• <code>videoDatabase</code> : pour le dictionnaire général</li>
                    <li>• <code>pharmacyVideos</code> : pour le lexique pharmacie</li>
                  </ul>
                  <p className="mt-2">3. Ajoutez vos vidéos au format :</p>
                  <p className={`ml-4 ${
                    theme === 'dark'
                      ? 'text-green-400'
                      : theme === 'pharmacy'
                        ? 'text-green-600'
                        : 'text-green-600'
                  }`}>
                    'https://votre-domaine.com/chemin/nom-video.webm'
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className={`text-lg font-semibold mb-2 ${
                theme === 'dark'
                  ? 'text-white'
                  : theme === 'pharmacy'
                    ? 'text-blue-600'
                    : 'text-gray-900'
              }`}>
                Gestion des PDFs
              </h3>
              <div className="space-y-4">
                <p className={`${
                  theme === 'dark'
                    ? 'text-gray-200'
                    : theme === 'pharmacy'
                      ? 'text-gray-700'
                      : 'text-gray-700'
                }`}>
                  Pour ajouter ou modifier des documents PDF :
                </p>
                <div className={`rounded-lg p-4 font-mono text-sm ${
                  theme === 'dark'
                    ? 'bg-gray-700 text-gray-200'
                    : theme === 'pharmacy'
                      ? 'bg-blue-50 text-gray-700'
                      : 'bg-gray-100 text-gray-700'
                }`}>
                  <p className="mb-2">1. Ouvrez le fichier <code>src/App.tsx</code></p>
                  <p className="mb-2">2. Localisez la constante <code>pdfDatabase</code></p>
                  <p className="mb-2">3. Ajoutez votre PDF au format :</p>
                  <pre className={`ml-4 whitespace-pre-wrap ${
                    theme === 'dark'
                      ? 'text-green-400'
                      : theme === 'pharmacy'
                        ? 'text-green-600'
                        : 'text-green-600'
                  }`}>
{`{
  title: 'Titre du document',
  url: 'https://votre-domaine.com/document.pdf',
  description: 'Description du document'
}`}
                  </pre>
                  <p className="mt-2">4. Le document sera automatiquement accessible dans la liste des PDFs</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};