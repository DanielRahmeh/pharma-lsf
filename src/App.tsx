import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { VideoList } from './components/VideoList';
import { HomePage } from './components/HomePage';
import { HelpModal } from './components/HelpModal';
import { PdfModal } from './components/PdfModal';
import { MobileMenu } from './components/MobileMenu';
import { Theme, Page } from './types';
import { useThemeClasses } from './hooks/useThemeClasses';

// All Videos Database
const videoDatabase = [
  'https://rahmeh.fr/videos_lsf/abandonner.webm',
  'https://rahmeh.fr/videos_lsf/abbaye.webm',
  'https://rahmeh.fr/videos_lsf/abdiquer.webm',
  'https://rahmeh.fr/videos_lsf/abeille.webm',
  'https://rahmeh.fr/videos_lsf/abientot.webm',
  'https://rahmeh.fr/videos_lsf/ablation.webm',
  'https://rahmeh.fr/videos_lsf/abonnement.webm',
  'https://rahmeh.fr/videos_lsf/académie.webm',
  'https://rahmeh.fr/videos_lsf/accidentdevoiture.webm',
  'https://rahmeh.fr/videos_lsf/accompagner.webm',
  'https://rahmeh.fr/videos_lsf/accord.webm',
  'https://rahmeh.fr/videos_lsf/achat.webm',
  'https://rahmeh.fr/videos_lsf/acheter.webm',
  'https://rahmeh.fr/videos_lsf/acide.webm',
  'https://rahmeh.fr/videos_lsf/bien.webm',
  'https://rahmeh.fr/videos_lsf/bientot.webm',
  'https://rahmeh.fr/videos_lsf/bleu.webm',
  'https://rahmeh.fr/videos_lsf/blond.webm',
  'https://rahmeh.fr/videos_lsf/boeuf.webm',
];

// Pharmacy Videos Database
const pharmacyVideos = [
  'https://rahmeh.fr/videos_lsf/ablation.webm',
  'https://rahmeh.fr/videos_lsf/acide.webm',
];

// PDF Database
const pdfDatabase = [
  {
    title: 'Livret LSF',
    url: 'https://rahmeh.fr/pdf_lsf/livret_lsf.pdf',
    description: 'Vocabulaire fondamental en langue des signes française'
  },
  {
    title: 'Manuel LSF',
    url: 'https://rahmeh.fr/pdf_lsf/lsf.pdf',
    description: 'Guide complet pour apprendre la LSF'
  },
  {
    title: 'Lexique Médical LSF',
    url: 'https://rahmeh.fr/pdf_lsf/signe_pour_patient.pdf',
    description: 'Termes spécifiques pour la communication en pharmacie'
  },
  {
    title: 'Guide Pratique - Pharmacie LSF',
    url: 'https://rahmeh.fr/pdf_lsf/lsf_pharmacie.pdf',
    description: 'Guide pour l\'accueil des patients sourds en pharmacie'
  }
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVideos, setFilteredVideos] = useState<string[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>('light');
  const [showHelp, setShowHelp] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? new Set(JSON.parse(savedFavorites)) : new Set();
  });
  const [showPdf, setShowPdf] = useState(false);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const { getCardClasses } = useThemeClasses(theme);

  useEffect(() => {
    const videos = currentPage === 'pharmacy' ? pharmacyVideos : videoDatabase;
    const filtered = videos.filter(video => 
      video.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVideos(filtered);
  }, [searchTerm, currentPage]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([url, videoRef]) => {
      if (videoRef) {
        if (url === hoveredVideo) {
          videoRef.currentTime = 0;
          videoRef.play().catch(() => {});
        } else {
          videoRef.pause();
          videoRef.currentTime = 0;
        }
      }
    });
  }, [hoveredVideo]);

  const toggleFavorite = (video: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const newFavorites = new Set(favorites);
    if (newFavorites.has(video)) {
      newFavorites.delete(video);
    } else {
      newFavorites.add(video);
    }
    setFavorites(newFavorites);
  };

  if (selectedVideo) {
    const word = selectedVideo.split('/').pop()?.replace('.webm', '');
    return (
      <div className="fixed inset-0 bg-black">
        <button
          onClick={() => setSelectedVideo(null)}
          className="absolute top-4 right-4 z-10 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Close fullscreen"
        >
          <X className="w-6 h-6 text-white" />
        </button>
        <video
          src={selectedVideo}
          className="w-full h-full object-contain"
          autoPlay
          loop
          controls
          playsInline
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent h-48 pointer-events-none">
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
            <h2 className="text-4xl font-bold text-white tracking-wide mb-2">{word}</h2>
            <div className="h-1 w-24 bg-white/30 mx-auto rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  const themeClasses = theme === 'dark'
    ? 'bg-gray-900 text-white'
    : theme === 'pharmacy'
      ? 'bg-gradient-to-br from-blue-50 to-green-50'
      : 'bg-gray-50';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses}`}>
      <Header
        theme={theme}
        currentPage={currentPage}
        onThemeChange={setTheme}
        onShowHelp={() => setShowHelp(true)}
        onShowPdf={() => setShowPdf(true)}
        onShowMenu={() => setShowMenu(!showMenu)}
        onPageChange={setCurrentPage}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        {currentPage === 'home' ? (
          <HomePage theme={theme} onPageChange={setCurrentPage} />
        ) : (
          <>
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              theme={theme}
            />
            <VideoList
              videos={filteredVideos}
              favorites={favorites}
              theme={theme}
              hoveredVideo={hoveredVideo}
              onHover={setHoveredVideo}
              onSelect={setSelectedVideo}
              onToggleFavorite={toggleFavorite}
              videoRefs={videoRefs}
              currentPage={currentPage}
              searchTerm={searchTerm}
            />
          </>
        )}
      </main>

      {/* Modals */}
      {showHelp && (
        <HelpModal theme={theme} onClose={() => setShowHelp(false)} />
      )}

      {showPdf && (
        <PdfModal 
          theme={theme} 
          onClose={() => setShowPdf(false)}
          pdfs={pdfDatabase}
        />
      )}

      {/* Mobile Menu */}
      {showMenu && (
        <MobileMenu
          theme={theme}
          onThemeChange={setTheme}
          onShowHelp={() => setShowHelp(true)}
          onShowPdf={() => setShowPdf(true)}
          onClose={() => setShowMenu(false)}
        />
      )}
    </div>
  );
}

export default App;