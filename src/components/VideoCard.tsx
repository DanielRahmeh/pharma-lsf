import React from 'react';
import { Play, Star } from 'lucide-react';
import { Theme } from '../types';
import { useThemeClasses } from '../hooks/useThemeClasses';

interface VideoCardProps {
  video: string;
  isFavorite: boolean;
  theme: Theme;
  hoveredVideo: string | null;
  onHover: (video: string | null) => void;
  onSelect: (video: string) => void;
  onToggleFavorite: (video: string, event: React.MouseEvent) => void;
  videoRef: (el: HTMLVideoElement | null) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  video,
  isFavorite,
  theme,
  hoveredVideo,
  onHover,
  onSelect,
  onToggleFavorite,
  videoRef,
}) => {
  const { getCardClasses, getFavoriteButtonClasses } = useThemeClasses(theme);
  const word = video.split('/').pop()?.replace('.webm', '');

  return (
    <div
      onClick={() => onSelect(video)}
      onMouseEnter={() => onHover(video)}
      onMouseLeave={() => onHover(null)}
      className={`${getCardClasses()} rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.02] relative`}
    >
      <button
        onClick={(e) => onToggleFavorite(video, e)}
        className={getFavoriteButtonClasses(isFavorite)}
        aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
      >
        <Star className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
      </button>
      <div className="relative aspect-video">
        <video
          ref={videoRef}
          src={video}
          className="w-full h-full object-cover"
          preload="metadata"
          muted
          playsInline
          loop
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
          hoveredVideo === video ? 'opacity-0' : 'opacity-100'
        }`} />
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          hoveredVideo === video ? 'opacity-0' : 'opacity-100'
        }`}>
          <div className={`p-3 rounded-full ${
            theme === 'dark' 
              ? 'bg-white/20' 
              : theme === 'pharmacy' 
                ? 'bg-green-500/20' 
                : 'bg-black/20'
          } backdrop-blur-sm group-hover:scale-110 transition-transform duration-300`}>
            <Play className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className={`text-lg font-medium ${
          theme === 'dark' 
            ? 'text-gray-200' 
            : theme === 'pharmacy' 
              ? 'text-blue-700' 
              : 'text-gray-900'
        }`}>
          {word}
        </p>
        <p className={`text-sm mt-1 ${
          theme === 'dark' 
            ? 'text-gray-400' 
            : theme === 'pharmacy' 
              ? 'text-blue-600/70' 
              : 'text-gray-500'
        }`}>
          Cliquez pour voir en plein écran
        </p>
      </div>
    </div>
  );
};