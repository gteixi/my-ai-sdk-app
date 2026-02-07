/**
 * Tests for Zod schemas
 * Verifies validation logic for road bikes, albums, and recipes
 */

import { describe, it, expect } from 'vitest';
import { roadBikeSchema, albumSchema, recipeSchema, getSchema } from '@/lib/schemas';

describe('roadBikeSchema', () => {
  it('should validate a complete road bike object', () => {
    const validBike = {
      model: 'Ultimate CF SLX',
      brand: 'Canyon',
      year: 2024,
      category: 'racing' as const,
      frame: {
        material: 'carbon' as const,
        weight: '850g',
        geometry: 'Race geometry',
      },
      groupset: {
        brand: 'Shimano',
        model: 'Dura-Ace Di2',
        speeds: 12,
        electronic: true,
      },
      wheels: {
        brand: 'DT Swiss',
        rimDepth: '50mm',
        tubeless: true,
      },
      price: 3999,
      weight: '7.2kg',
      features: ['Aero design', 'Electronic shifting'],
      tourDeFranceHistory: {
        usedInTDF: true,
        teams: ['Movistar Team'],
        victories: ['2021 Stage 15'],
      },
    };

    const result = roadBikeSchema.safeParse(validBike);
    expect(result.success).toBe(true);
  });

  it('should validate minimal road bike object', () => {
    const minimalBike = {
      model: 'Ultimate',
      brand: 'Canyon',
      year: 2024,
      category: 'racing' as const,
      frame: {
        material: 'carbon' as const,
        weight: '850g',
      },
      groupset: {
        brand: 'Shimano',
        model: 'Dura-Ace',
        speeds: 12,
        electronic: false,
      },
      price: 2999,
      weight: '7.5kg',
      features: [],
    };

    const result = roadBikeSchema.safeParse(minimalBike);
    expect(result.success).toBe(true);
  });

  it('should reject invalid category', () => {
    const invalidBike = {
      model: 'Test',
      brand: 'Test',
      year: 2024,
      category: 'invalid-category',
      frame: { material: 'carbon', weight: '850g' },
      groupset: { brand: 'Test', model: 'Test', speeds: 12, electronic: false },
      price: 1000,
      weight: '8kg',
      features: [],
    };

    const result = roadBikeSchema.safeParse(invalidBike);
    expect(result.success).toBe(false);
  });

  it('should reject invalid frame material', () => {
    const invalidBike = {
      model: 'Test',
      brand: 'Test',
      year: 2024,
      category: 'racing',
      frame: { material: 'plastic', weight: '850g' },
      groupset: { brand: 'Test', model: 'Test', speeds: 12, electronic: false },
      price: 1000,
      weight: '8kg',
      features: [],
    };

    const result = roadBikeSchema.safeParse(invalidBike);
    expect(result.success).toBe(false);
  });

  it('should reject missing required fields', () => {
    const incompleteBike = {
      model: 'Test',
      brand: 'Test',
      // Missing other required fields
    };

    const result = roadBikeSchema.safeParse(incompleteBike);
    expect(result.success).toBe(false);
  });
});

describe('albumSchema', () => {
  it('should validate a complete album object', () => {
    const validAlbum = {
      title: 'My 21st Century Blues',
      artist: 'Raye',
      releaseYear: 2023,
      genre: 'R&B/Soul',
      label: 'Human Re Sources',
      tracks: [
        {
          number: 1,
          title: 'Introduction.',
          duration: '0:48',
          featuring: [],
        },
        {
          number: 2,
          title: 'Oscar Winning Tears.',
          duration: '3:24',
        },
      ],
      producers: ['Mike Sabath', 'Raye'],
      awards: ['Mercury Prize 2024'],
      rating: 5,
    };

    const result = albumSchema.safeParse(validAlbum);
    expect(result.success).toBe(true);
  });

  it('should validate minimal album object', () => {
    const minimalAlbum = {
      title: 'Test Album',
      artist: 'Test Artist',
      releaseYear: 2023,
      genre: 'Pop',
      tracks: [
        {
          number: 1,
          title: 'Track 1',
          duration: '3:00',
        },
      ],
    };

    const result = albumSchema.safeParse(minimalAlbum);
    expect(result.success).toBe(true);
  });

  it('should reject invalid rating', () => {
    const invalidAlbum = {
      title: 'Test',
      artist: 'Test',
      releaseYear: 2023,
      genre: 'Pop',
      tracks: [],
      rating: 6, // Invalid - max is 5
    };

    const result = albumSchema.safeParse(invalidAlbum);
    expect(result.success).toBe(false);
  });

  it('should reject negative rating', () => {
    const invalidAlbum = {
      title: 'Test',
      artist: 'Test',
      releaseYear: 2023,
      genre: 'Pop',
      tracks: [],
      rating: -1,
    };

    const result = albumSchema.safeParse(invalidAlbum);
    expect(result.success).toBe(false);
  });

  it('should validate tracks with featuring artists', () => {
    const albumWithFeatures = {
      title: 'Test',
      artist: 'Test',
      releaseYear: 2023,
      genre: 'Pop',
      tracks: [
        {
          number: 1,
          title: 'Collab Track',
          duration: '3:30',
          featuring: ['Artist A', 'Artist B'],
        },
      ],
    };

    const result = albumSchema.safeParse(albumWithFeatures);
    expect(result.success).toBe(true);
  });
});

describe('recipeSchema', () => {
  it('should validate a complete recipe object', () => {
    const validRecipe = {
      name: 'Pasta Carbonara',
      cuisine: 'Italian',
      difficulty: 'medium' as const,
      prepTime: 10,
      cookTime: 15,
      servings: 4,
      ingredients: [
        { item: 'Spaghetti', amount: '400g' },
        { item: 'Eggs', amount: '4 large' },
        { item: 'Guanciale', amount: '200g' },
      ],
      instructions: [
        'Boil pasta in salted water',
        'Fry guanciale until crispy',
        'Mix eggs with cheese',
        'Combine all ingredients',
      ],
      tags: ['pasta', 'Italian', 'traditional'],
      nutritionInfo: {
        calories: 650,
        protein: '25g',
        carbs: '75g',
      },
    };

    const result = recipeSchema.safeParse(validRecipe);
    expect(result.success).toBe(true);
  });

  it('should validate minimal recipe object', () => {
    const minimalRecipe = {
      name: 'Simple Pasta',
      cuisine: 'Italian',
      difficulty: 'easy' as const,
      prepTime: 5,
      cookTime: 10,
      servings: 2,
      ingredients: [
        { item: 'Pasta', amount: '200g' },
      ],
      instructions: ['Cook pasta'],
    };

    const result = recipeSchema.safeParse(minimalRecipe);
    expect(result.success).toBe(true);
  });

  it('should reject invalid difficulty level', () => {
    const invalidRecipe = {
      name: 'Test',
      cuisine: 'Test',
      difficulty: 'impossible',
      prepTime: 10,
      cookTime: 20,
      servings: 4,
      ingredients: [],
      instructions: [],
    };

    const result = recipeSchema.safeParse(invalidRecipe);
    expect(result.success).toBe(false);
  });

  it('should validate recipe with nutrition info', () => {
    const recipeWithNutrition = {
      name: 'Healthy Salad',
      cuisine: 'Mediterranean',
      difficulty: 'easy' as const,
      prepTime: 10,
      cookTime: 0,
      servings: 2,
      ingredients: [{ item: 'Lettuce', amount: '1 head' }],
      instructions: ['Wash and chop lettuce'],
      nutritionInfo: {
        calories: 150,
        protein: '5g',
        carbs: '20g',
      },
    };

    const result = recipeSchema.safeParse(recipeWithNutrition);
    expect(result.success).toBe(true);
  });

  it('should validate recipe with partial nutrition info', () => {
    const recipe = {
      name: 'Test',
      cuisine: 'Test',
      difficulty: 'easy' as const,
      prepTime: 10,
      cookTime: 20,
      servings: 4,
      ingredients: [],
      instructions: [],
      nutritionInfo: {
        calories: 300, // Only calories provided
      },
    };

    const result = recipeSchema.safeParse(recipe);
    expect(result.success).toBe(true);
  });
});

describe('getSchema', () => {
  it('should return roadBikeSchema for roadBike type', () => {
    const schema = getSchema('roadBike');
    expect(schema).toBe(roadBikeSchema);
  });

  it('should return albumSchema for album type', () => {
    const schema = getSchema('album');
    expect(schema).toBe(albumSchema);
  });

  it('should return recipeSchema for recipe type', () => {
    const schema = getSchema('recipe');
    expect(schema).toBe(recipeSchema);
  });

  it('should return schemas that can validate correct data', () => {
    const bikeData = {
      model: 'Test',
      brand: 'Test',
      year: 2024,
      category: 'racing' as const,
      frame: { material: 'carbon' as const, weight: '800g' },
      groupset: { brand: 'Test', model: 'Test', speeds: 12, electronic: false },
      price: 2000,
      weight: '7kg',
      features: [],
    };

    const schema = getSchema('roadBike');
    const result = schema.safeParse(bikeData);
    expect(result.success).toBe(true);
  });
});
