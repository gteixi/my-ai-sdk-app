/**
 * Image display component
 * Reusable component for displaying images with loading and error states
 */

interface ImageDisplayProps {
  url: string | null;
  loading: boolean;
  error: boolean;
  alt: string;
  onError: () => void;
}

/**
 * Displays an image with appropriate loading and error states
 * Used by all renderer components (Recipe, Album, RoadBike)
 */
export function ImageDisplay({ url, loading, error, alt, onError }: ImageDisplayProps) {
  // Show actual image when URL is available
  if (url && !loading && !error) {
    return (
      <div className="flex justify-center mb-4">
        <img 
          src={url} 
          alt={alt}
          className="w-64 h-64 object-cover rounded-lg shadow-lg"
          onError={onError}
        />
      </div>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center mb-4">
        <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <span className="text-gray-500 text-sm">Loading image...</span>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex justify-center mb-4">
        <div className="w-64 h-64 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
          <span className="text-gray-400 text-sm">📷 Image unavailable</span>
        </div>
      </div>
    );
  }

  return null;
}
