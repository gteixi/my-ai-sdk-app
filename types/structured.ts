/**
 * TypeScript type definitions for structured data generation
 * Mirrors the Zod schemas used for validation
 */

/**
 * Road bike category types
 */
export type BikeCategory = 'racing' | 'endurance' | 'aero' | 'gravel' | 'touring';

/**
 * Frame material types
 */
export type FrameMaterial = 'carbon' | 'aluminum' | 'steel' | 'titanium';

/**
 * Recipe difficulty levels
 */
export type RecipeDifficulty = 'easy' | 'medium' | 'hard';

/**
 * Road bike frame specifications
 */
export interface BikeFrame {
  material: FrameMaterial;
  weight: string;
  geometry?: string;
}

/**
 * Road bike groupset specifications
 */
export interface BikeGroupset {
  brand: string;
  model: string;
  speeds: number;
  electronic: boolean;
}

/**
 * Road bike wheel specifications
 */
export interface BikeWheels {
  brand?: string;
  rimDepth?: string;
  tubeless?: boolean;
}

/**
 * Tour de France history for a bike
 */
export interface TourDeFranceHistory {
  usedInTDF: boolean;
  teams?: string[];
  victories?: string[];
}

/**
 * Complete road bike data structure
 */
export interface RoadBike {
  model: string;
  brand: string;
  year: number;
  category: BikeCategory;
  frame: BikeFrame;
  groupset: BikeGroupset;
  wheels?: BikeWheels;
  price: number;
  weight: string;
  features: string[];
  tourDeFranceHistory?: TourDeFranceHistory;
}

/**
 * Music album track information
 */
export interface AlbumTrack {
  number: number;
  title: string;
  duration: string;
  featuring?: string[];
}

/**
 * Complete music album data structure
 */
export interface Album {
  title: string;
  artist: string;
  releaseYear: number;
  genre: string;
  label?: string;
  tracks: AlbumTrack[];
  producers?: string[];
  awards?: string[];
  rating?: number;
}

/**
 * Recipe ingredient specification
 */
export interface RecipeIngredient {
  item: string;
  amount: string;
}

/**
 * Recipe nutrition information
 */
export interface RecipeNutritionInfo {
  calories?: number;
  protein?: string;
  carbs?: string;
}

/**
 * Complete recipe data structure
 */
export interface Recipe {
  name: string;
  cuisine: string;
  difficulty: RecipeDifficulty;
  prepTime: number;
  cookTime: number;
  servings: number;
  ingredients: RecipeIngredient[];
  instructions: string[];
  tags?: string[];
  nutritionInfo?: RecipeNutritionInfo;
}

/**
 * Schema type identifier union
 */
export type SchemaType = 'roadBike' | 'album' | 'recipe';

/**
 * Schema example configuration
 */
export interface SchemaExample {
  label: string;
  icon: string;
  examples: string[];
}

/**
 * Schema examples mapping
 */
export type SchemaExamplesMap = Record<SchemaType, SchemaExample>;

/**
 * Error details parsed from API responses
 */
export interface ErrorDetails {
  metric: string | null;
  limit: string | null;
  model: string | null;
  retryIn: string | null;
}

/**
 * Image loading state
 */
export interface ImageState {
  url: string | null;
  loading: boolean;
  error: boolean;
}
