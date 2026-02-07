/**
 * Album renderer component
 * Displays formatted music album data with cover image, tracklist, and awards
 */

import type { Album, ImageState } from '@/types/structured';
import { ImageDisplay } from './ImageDisplay';

interface AlbumRendererProps {
  data: Album;
  imageState: ImageState;
  onImageError: () => void;
}

/**
 * Renders an album with all details including tracklist, producers, and awards
 */
export function AlbumRenderer({ data, imageState, onImageError }: AlbumRendererProps) {
  return (
    <div className="space-y-4">
      {/* Album header */}
      <div>
        <h4 className="font-bold text-[17px] leading-[22px]">{data.title}</h4>
        {data.artist && (
          <p className="text-[15px] leading-[20px] text-gray-600">{data.artist}</p>
        )}
        {(data.genre || data.releaseYear) && (
          <p className="text-[15px] leading-[20px] text-gray-500">
            {data.genre}{data.genre && data.releaseYear && ' • '}{data.releaseYear}
          </p>
        )}
        {data.label && (
          <p className="text-[13px] leading-[18px] text-gray-500">{data.label}</p>
        )}
      </div>
      
      {/* Album cover image */}
      <ImageDisplay
        url={imageState.url}
        loading={imageState.loading}
        error={imageState.error}
        alt="Album cover"
        onError={onImageError}
      />
      
      {/* Rating */}
      {data.rating && (
        <div className="flex items-center gap-2 text-[15px] leading-[20px]">
          <span className="text-yellow-500">⭐</span>
          <span className="font-semibold">{data.rating}/5</span>
        </div>
      )}
      
      {/* Tracklist */}
      {data.tracks && data.tracks.length > 0 && (
        <div className="text-[15px] leading-[20px]">
          <strong>Tracklist:</strong>
          <ol className="mt-2 space-y-1">
            {data.tracks.map((track, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-gray-500 min-w-[20px]">{track.number}.</span>
                <div className="flex-1">
                  <div className="font-medium">{track.title}</div>
                  {track.featuring && track.featuring.length > 0 && (
                    <div className="text-[13px] leading-[18px] text-gray-500">
                      feat. {track.featuring.join(', ')}
                    </div>
                  )}
                </div>
                {track.duration && (
                  <span className="text-gray-500 text-[13px] leading-[18px]">
                    {track.duration}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      )}
      
      {/* Producers */}
      {data.producers && data.producers.length > 0 && (
        <div className="text-[15px] leading-[20px]">
          <strong>Producers:</strong> {data.producers.join(', ')}
        </div>
      )}
      
      {/* Awards */}
      {data.awards && data.awards.length > 0 && (
        <div className="text-[15px] leading-[20px]">
          <strong>Awards & Recognition:</strong>
          <ul className="list-disc list-inside mt-1">
            {data.awards.map((award, i) => (
              <li key={i}>{award}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
