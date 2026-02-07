/**
 * Tests for schema constants and utilities
 */

import { describe, it, expect } from 'vitest';
import { getRandomExample, getAllExamples, getSchemaMetadata, SCHEMA_EXAMPLES } from '@/lib/constants/examples';

describe('SCHEMA_EXAMPLES', () => {
  it('should have all three schema types', () => {
    expect(SCHEMA_EXAMPLES).toHaveProperty('roadBike');
    expect(SCHEMA_EXAMPLES).toHaveProperty('album');
    expect(SCHEMA_EXAMPLES).toHaveProperty('recipe');
  });

  it('should have proper structure for each schema', () => {
    Object.values(SCHEMA_EXAMPLES).forEach(schema => {
      expect(schema).toHaveProperty('label');
      expect(schema).toHaveProperty('icon');
      expect(schema).toHaveProperty('examples');
      expect(Array.isArray(schema.examples)).toBe(true);
      expect(schema.examples.length).toBeGreaterThan(0);
    });
  });

  it('should have at least 5 examples for each schema', () => {
    expect(SCHEMA_EXAMPLES.roadBike.examples.length).toBeGreaterThanOrEqual(5);
    expect(SCHEMA_EXAMPLES.album.examples.length).toBeGreaterThanOrEqual(5);
    expect(SCHEMA_EXAMPLES.recipe.examples.length).toBeGreaterThanOrEqual(5);
  });
});

describe('getRandomExample', () => {
  it('should return a string from roadBike examples', () => {
    const example = getRandomExample('roadBike');
    
    expect(typeof example).toBe('string');
    expect(SCHEMA_EXAMPLES.roadBike.examples).toContain(example);
  });

  it('should return a string from album examples', () => {
    const example = getRandomExample('album');
    
    expect(typeof example).toBe('string');
    expect(SCHEMA_EXAMPLES.album.examples).toContain(example);
  });

  it('should return a string from recipe examples', () => {
    const example = getRandomExample('recipe');
    
    expect(typeof example).toBe('string');
    expect(SCHEMA_EXAMPLES.recipe.examples).toContain(example);
  });

  it('should return different examples on multiple calls (statistically)', () => {
    const examples = new Set<string>();
    
    // Call 20 times - should get at least 2 different examples
    for (let i = 0; i < 20; i++) {
      examples.add(getRandomExample('roadBike'));
    }
    
    expect(examples.size).toBeGreaterThan(1);
  });
});

describe('getAllExamples', () => {
  it('should return all examples for roadBike', () => {
    const examples = getAllExamples('roadBike');
    
    expect(Array.isArray(examples)).toBe(true);
    expect(examples).toEqual(SCHEMA_EXAMPLES.roadBike.examples);
  });

  it('should return all examples for album', () => {
    const examples = getAllExamples('album');
    
    expect(Array.isArray(examples)).toBe(true);
    expect(examples).toEqual(SCHEMA_EXAMPLES.album.examples);
  });

  it('should return all examples for recipe', () => {
    const examples = getAllExamples('recipe');
    
    expect(Array.isArray(examples)).toBe(true);
    expect(examples).toEqual(SCHEMA_EXAMPLES.recipe.examples);
  });
});

describe('getSchemaMetadata', () => {
  it('should return label and icon for roadBike', () => {
    const metadata = getSchemaMetadata('roadBike');
    
    expect(metadata).toHaveProperty('label');
    expect(metadata).toHaveProperty('icon');
    expect(metadata.label).toBe(SCHEMA_EXAMPLES.roadBike.label);
    expect(metadata.icon).toBe(SCHEMA_EXAMPLES.roadBike.icon);
  });

  it('should return label and icon for album', () => {
    const metadata = getSchemaMetadata('album');
    
    expect(metadata.label).toBe(SCHEMA_EXAMPLES.album.label);
    expect(metadata.icon).toBe(SCHEMA_EXAMPLES.album.icon);
  });

  it('should return label and icon for recipe', () => {
    const metadata = getSchemaMetadata('recipe');
    
    expect(metadata.label).toBe(SCHEMA_EXAMPLES.recipe.label);
    expect(metadata.icon).toBe(SCHEMA_EXAMPLES.recipe.icon);
  });

  it('should not return examples array', () => {
    const metadata = getSchemaMetadata('roadBike');
    
    expect(metadata).not.toHaveProperty('examples');
  });
});
