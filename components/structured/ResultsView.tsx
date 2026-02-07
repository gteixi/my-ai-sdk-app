/**
 * Results view component
 * Displays side-by-side JSON output and rendered view of generated structured data
 */

import type { SchemaType, Recipe, Album, RoadBike, ImageState } from '@/types/structured';
import { RecipeRenderer } from './renderers/RecipeRenderer';
import { AlbumRenderer } from './renderers/AlbumRenderer';
import { RoadBikeRenderer } from './renderers/RoadBikeRenderer';

interface ResultsViewProps {
  schemaType: SchemaType;
  object: Record<string, unknown> | undefined;
  imageState: ImageState;
  onImageError: () => void;
}

/**
 * Renders the appropriate component based on schema type
 * Implements the Strategy pattern for different data renderers
 */
function renderData(
  schemaType: SchemaType,
  data: Record<string, unknown>,
  imageState: ImageState,
  onImageError: () => void
) {
  switch (schemaType) {
    case 'recipe':
      return (
        <RecipeRenderer 
          data={data as unknown as Recipe} 
          imageState={imageState} 
          onImageError={onImageError}
        />
      );
    case 'album':
      return (
        <AlbumRenderer 
          data={data as unknown as Album} 
          imageState={imageState} 
          onImageError={onImageError}
        />
      );
    case 'roadBike':
      return (
        <RoadBikeRenderer 
          data={data as unknown as RoadBike} 
          imageState={imageState} 
          onImageError={onImageError}
        />
      );
    default:
      return <pre className="text-xs">{JSON.stringify(data, null, 2)}</pre>;
  }
}

/**
 * Side-by-side view of JSON output and rendered visualization
 */
export function ResultsView({ 
  schemaType, 
  object, 
  imageState, 
  onImageError 
}: ResultsViewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* JSON View */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <span>📄</span> JSON Output
        </h3>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-[18px] overflow-auto max-h-[500px]">
          <pre className="text-xs leading-[18px]">
            {object ? JSON.stringify(object, null, 2) : 'Generating...'}
          </pre>
        </div>
      </div>

      {/* Rendered View */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <span>✨</span> Rendered View
        </h3>
        <div className="bg-[#E9E9EB] rounded-[18px] p-4 max-h-[500px] overflow-auto">
          {object ? (
            renderData(schemaType, object, imageState, onImageError)
          ) : (
            <p className="text-gray-500 text-[15px] leading-[20px]">
              Generating structured data...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
