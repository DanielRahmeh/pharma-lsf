import React from 'react';
import { Star } from 'lucide-react';
import { VideoCard } from './VideoCard';
import { Theme } from '../types';
import { useThemeClasses } from '../hooks/useThemeClasses';

interface VideoListProps {
  videos: string[];
  favorites: Set<string>;
  theme: Theme;
  hoveredVideo: string | null;
  onHover: (video: string | null) => void;
  onSelect: (video: string) => void;
  onToggleFavorite: (video: string, event: React.MouseEvent) => void;
  videoRefs: React.MutableRefObject<{ [key: string]: HTMLVideoElement | null }>;
  currentPage: string;
  searchTerm: string;
}

export const VideoList: React.FC<VideoListProps> = ({
  videos,
  favorites,
  theme,
  hoveredVideo,
  onHover,
  onSelect,
  onToggleFavorite,
  videoRefs,
  currentPage,
  searchTerm,
}) => {
  const { getCardClasses } = useThemeClasses(theme);

  const favoriteVideos = Array.from(favorites)
    .filter(video => {
      const matchesSearch = video.toLowerCase().includes(searchTerm.toLowerCase());
      const isPharmacyVideo = videos.includes(video);
      return matchesSearch && (currentPage === 'pharmacy' ? isPharmacyVideo : true);
    });

  return (
    <>
      {favoriteVideos.length > 0 && (
        <div className={`mb-12 p-6 rounded-2xl ${
          theme === 'dark'
            ? 'bg-gray-800 border-2 border-gray-700/50 shadow-xl shadow-gray-900/20'
            : theme === 'pharmacy'
              ? 'bg-gradient-to-r from-blue-100/90 to-green-100/90 border-2 border-green-200/50 shadow-xl shadow-green-900/10'
              : 'bg-white border-2 border-blue-100/50 shadow-xl shadow-blue-900/10'
        }`}>
          <div className="flex items-center gap-3 mb-6">
            <Star className={`w-6 h-6 ${
              theme === 'dark'
                ? 'text-yellow-400'
                : theme === 'pharmacy'
                  ? 'text-yellow-500'
                  : 'text-yellow-500'
            }`} />
            <h2 className={`text-xl font-semibold ${
              theme === 'dark'
                ? 'text-gray-200'
                : theme === 'pharmacy'
                  ? 'text-blue-700'
                  : 'text-gray-900'
            }`}>
              Vidéos favorites
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteVideos.map(video => (
              <VideoCard
                key={video}
                video={video}
                isFavorite={favorites.has(video)}
                theme={theme}
                hoveredVideo={hoveredVideo}
                onHover={onHover}
                onSelect={onSelect}
                onToggleFavorite={onToggleFavorite}
                videoRef={el => videoRefs.current[video] = el}
              />
            ))}
          </div>
        </div>
      )}

      <div className={`${
        theme === 'dark'
          ? 'bg-gray-800/30'
          : theme === 'pharmacy'
            ? 'bg-white/30'
            : 'bg-gray-50/50'
      } p-6 rounded-2xl`}>
        <h2 className={`text-xl font-semibold mb-6 ${
          theme === 'dark'
            ? 'text-gray-200'
            : theme === 'pharmacy'
              ? 'text-blue-700'
              : 'text-gray-900'
        }`}>
          Tous les signes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map(video => (
            <VideoCard
              key={video}
              video={video}
              isFavorite={favorites.has(video)}
              theme={theme}
              hoveredVideo={hoveredVideo}
              onHover={onHover}
              onSelect={onSelect}
              onToggleFavorite={onToggleFavorite}
              videoRef={el => videoRefs.current[video] = el}
            />
          ))}
        </div>
      </div>
    </>
  );
};