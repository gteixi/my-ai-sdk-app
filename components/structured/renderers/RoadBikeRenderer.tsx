/**
 * Road bike renderer component
 * Displays formatted road bike data with image, specs, and Tour de France history
 */

import type { RoadBike, ImageState } from '@/types/structured';
import { ImageDisplay } from './ImageDisplay';

interface RoadBikeRendererProps {
  data: RoadBike;
  imageState: ImageState;
  onImageError: () => void;
}

/**
 * Renders a road bike with all specifications, features, and Tour de France history
 */
export function RoadBikeRenderer({ data, imageState, onImageError }: RoadBikeRendererProps) {
  return (
    <div className="space-y-4">
      {/* Bike header */}
      <div>
        <h4 className="font-bold text-[17px] leading-[22px]">
          {data.brand} {data.model}
        </h4>
        <p className="text-[15px] leading-[20px] text-gray-600">
          {data.year} • {data.category}
        </p>
      </div>
      
      {/* Bike image */}
      <ImageDisplay
        url={imageState.url}
        loading={imageState.loading}
        error={imageState.error}
        alt="Bike image"
        onError={onImageError}
      />
      
      {/* Price */}
      {data.price && (
        <div className="text-[20px] leading-[24px] font-bold text-blue-600">
          ${data.price.toLocaleString()}
        </div>
      )}
      
      {/* Specifications */}
      <div className="bg-white bg-opacity-50 p-3 rounded-lg space-y-2 text-[15px] leading-[20px]">
        {data.frame && (
          <>
            <div>
              <strong>Frame:</strong> {data.frame.material} • {data.frame.weight}
            </div>
            {data.frame.geometry && (
              <div>
                <strong>Geometry:</strong> {data.frame.geometry}
              </div>
            )}
          </>
        )}
        
        {data.weight && (
          <div>
            <strong>Weight:</strong> {data.weight}
          </div>
        )}
        
        {data.groupset && (
          <div>
            <strong>Groupset:</strong> {data.groupset.brand} {data.groupset.model} • {data.groupset.speeds}-speed
            {data.groupset.electronic && ' • Electronic'}
          </div>
        )}
        
        {data.wheels && (
          <div>
            <strong>Wheels:</strong>
            {data.wheels.brand && ` ${data.wheels.brand}`}
            {data.wheels.rimDepth && ` • ${data.wheels.rimDepth} rim depth`}
            {data.wheels.tubeless && ' • Tubeless ready'}
          </div>
        )}
      </div>
      
      {/* Tour de France History */}
      {data.tourDeFranceHistory && data.tourDeFranceHistory.usedInTDF && (
        <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg text-[15px] leading-[20px]">
          <div className="font-semibold text-yellow-900 mb-1">🏆 Tour de France History</div>
          
          {data.tourDeFranceHistory.teams && data.tourDeFranceHistory.teams.length > 0 && (
            <div className="text-yellow-800">
              <strong>Teams:</strong> {data.tourDeFranceHistory.teams.join(', ')}
            </div>
          )}
          
          {data.tourDeFranceHistory.victories && data.tourDeFranceHistory.victories.length > 0 && (
            <div className="text-yellow-800 mt-1">
              <strong>Victories:</strong>
              <ul className="list-disc list-inside ml-2">
                {data.tourDeFranceHistory.victories.map((v, i) => (
                  <li key={i}>{v}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      
      {/* Features */}
      {data.features && data.features.length > 0 && (
        <div className="text-[15px] leading-[20px]">
          <strong>Features:</strong>
          <ul className="list-disc list-inside mt-1">
            {data.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
