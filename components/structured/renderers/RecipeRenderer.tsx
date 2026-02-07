/**
 * Recipe renderer component
 * Displays formatted recipe data with image, ingredients, and instructions
 */

import type { Recipe, ImageState } from '@/types/structured';
import { ImageDisplay } from './ImageDisplay';

interface RecipeRendererProps {
  data: Recipe;
  imageState: ImageState;
  onImageError: () => void;
}

/**
 * Renders a recipe with all details including nutrition, ingredients, and instructions
 */
export function RecipeRenderer({ data, imageState, onImageError }: RecipeRendererProps) {
  return (
    <div className="space-y-4">
      {/* Recipe header */}
      <div>
        <h4 className="font-bold text-[17px] leading-[22px]">{data.name}</h4>
        <p className="text-[15px] leading-[20px] text-gray-600">
          {data.cuisine} • {data.difficulty}
        </p>
      </div>
      
      {/* Recipe image */}
      <ImageDisplay
        url={imageState.url}
        loading={imageState.loading}
        error={imageState.error}
        alt="Dish photo"
        onError={onImageError}
      />
      
      {/* Time and servings info */}
      {(data.prepTime || data.cookTime || data.servings) && (
        <div className="flex gap-4 text-[15px] leading-[20px]">
          {data.prepTime && <span>⏱️ Prep: {data.prepTime}min</span>}
          {data.cookTime && <span>🍳 Cook: {data.cookTime}min</span>}
          {data.servings && <span>🍽️ Serves: {data.servings}</span>}
        </div>
      )}
      
      {/* Nutrition information */}
      {data.nutritionInfo && (
        <div className="bg-white bg-opacity-50 p-3 rounded-lg text-[15px] leading-[20px]">
          <strong>Nutrition per serving:</strong>
          {data.nutritionInfo.calories && (
            <span className="ml-2">{data.nutritionInfo.calories} cal</span>
          )}
          {data.nutritionInfo.protein && (
            <span className="ml-2">Protein: {data.nutritionInfo.protein}</span>
          )}
          {data.nutritionInfo.carbs && (
            <span className="ml-2">Carbs: {data.nutritionInfo.carbs}</span>
          )}
        </div>
      )}
      
      {/* Ingredients list */}
      {data.ingredients && data.ingredients.length > 0 && (
        <div className="text-[15px] leading-[20px]">
          <strong>Ingredients:</strong>
          <ul className="list-disc list-inside mt-1">
            {data.ingredients.map((ing, i) => (
              <li key={i}>
                {ing.amount} {ing.item}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Instructions */}
      {data.instructions && data.instructions.length > 0 && (
        <div className="text-[15px] leading-[20px]">
          <strong>Instructions:</strong>
          <ol className="list-decimal list-inside mt-1 space-y-1">
            {data.instructions.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      )}
      
      {/* Tags */}
      {data.tags && data.tags.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {data.tags.map((tag, i) => (
            <span 
              key={i} 
              className="px-2 py-1 bg-white bg-opacity-50 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
