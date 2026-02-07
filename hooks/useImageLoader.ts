/**
 * Custom hook for managing image loading state
 * Fetches images from the API based on generated object data
 */

import { useState, useEffect } from 'react';
import type { SchemaType, ImageState } from '@/types/structured';

interface UseImageLoaderOptions {
  object: Record<string, unknown> | undefined;
  isLoading: boolean;
  schemaType: SchemaType;
}

interface UseImageLoaderReturn extends ImageState {
  setError: (error: boolean) => void;
}

/**
 * Generates a search query for the image API based on schema type and object data
 */
function generateImageQuery(schemaType: SchemaType, object: Record<string, unknown>): string {
  switch (schemaType) {
    case 'recipe':
      return (object.name as string) || 'food';
    case 'roadBike':
      return `${object.brand || ''} ${object.model || ''} road bike`.trim() || 'road bike';
    case 'album':
      return `${object.title || ''} ${object.artist || ''} album cover`.trim() || 'music album';
    default:
      return 'image';
  }
}

/**
 * Hook to manage image loading for generated structured data
 * Automatically fetches an appropriate image when object generation completes
 * 
 * @param options - Configuration including object data, loading state, and schema type
 * @returns Image state with URL, loading status, error flag, and error setter
 */
export function useImageLoader({
  object,
  isLoading,
  schemaType,
}: UseImageLoaderOptions): UseImageLoaderReturn {
  const [imageState, setImageState] = useState<ImageState>({
    url: null,
    loading: false,
    error: false,
  });

  useEffect(() => {
    const fetchImage = async () => {
      // Only fetch image when object is complete (not loading anymore)
      if (!object || isLoading) return;

      setImageState(prev => ({ ...prev, loading: true, error: false }));

      try {
        const query = generateImageQuery(schemaType, object);
        const response = await fetch(`/api/image?query=${encodeURIComponent(query)}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch image');
        }

        const data = await response.json();
        
        setImageState({
          url: data.imageUrl,
          loading: false,
          error: false,
        });
      } catch (error) {
        setImageState({
          url: null,
          loading: false,
          error: true,
        });
      }
    };

    fetchImage();
  }, [object, isLoading, schemaType]);

  /**
   * Manually set the error state (useful for image load failures)
   */
  const setError = (error: boolean) => {
    setImageState(prev => ({ ...prev, error }));
  };

  return {
    ...imageState,
    setError,
  };
}
