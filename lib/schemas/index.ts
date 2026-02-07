/**
 * Zod schemas for structured data validation
 * These schemas are used by both the API and the frontend
 */

import { z } from 'zod';
import type { SchemaType } from '@/types/structured';

/**
 * Road bike schema
 * Validates road bike data including frame, groupset, wheels, and Tour de France history
 */
export const roadBikeSchema = z.object({
  model: z.string(),
  brand: z.string(),
  year: z.number(),
  category: z.enum(['racing', 'endurance', 'aero', 'gravel', 'touring']),
  frame: z.object({
    material: z.enum(['carbon', 'aluminum', 'steel', 'titanium']),
    weight: z.string(),
    geometry: z.string().optional(),
  }),
  groupset: z.object({
    brand: z.string(),
    model: z.string(),
    speeds: z.number(),
    electronic: z.boolean(),
  }),
  wheels: z.object({
    brand: z.string().optional(),
    rimDepth: z.string().optional(),
    tubeless: z.boolean().optional(),
  }).optional(),
  price: z.number(),
  weight: z.string(),
  features: z.array(z.string()),
  tourDeFranceHistory: z.object({
    usedInTDF: z.boolean(),
    teams: z.array(z.string()).optional(),
    victories: z.array(z.string()).optional(),
  }).optional(),
});

/**
 * Music album schema
 * Validates album data including tracks, producers, awards
 */
export const albumSchema = z.object({
  title: z.string(),
  artist: z.string(),
  releaseYear: z.number(),
  genre: z.string(),
  label: z.string().optional(),
  tracks: z.array(z.object({
    number: z.number(),
    title: z.string(),
    duration: z.string(),
    featuring: z.array(z.string()).optional(),
  })),
  producers: z.array(z.string()).optional(),
  awards: z.array(z.string()).optional(),
  rating: z.number().min(0).max(5).optional(),
});

/**
 * Recipe schema
 * Validates recipe data including ingredients, instructions, nutrition
 */
export const recipeSchema = z.object({
  name: z.string(),
  cuisine: z.string(),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  prepTime: z.number(),
  cookTime: z.number(),
  servings: z.number(),
  ingredients: z.array(z.object({
    item: z.string(),
    amount: z.string(),
  })),
  instructions: z.array(z.string()),
  tags: z.array(z.string()).optional(),
  nutritionInfo: z.object({
    calories: z.number().optional(),
    protein: z.string().optional(),
    carbs: z.string().optional(),
  }).optional(),
});

/**
 * Schema map for easy access by type
 */
export const schemas = {
  roadBike: roadBikeSchema,
  album: albumSchema,
  recipe: recipeSchema,
} as const;

/**
 * Get schema by type
 * @param schemaType - The type of schema to retrieve
 * @returns The corresponding Zod schema
 */
export function getSchema(schemaType: SchemaType) {
  return schemas[schemaType];
}

/**
 * Type helper to infer TypeScript types from Zod schemas
 */
export type SchemaInfer<T extends SchemaType> = z.infer<typeof schemas[T]>;
