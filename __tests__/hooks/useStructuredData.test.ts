/**
 * Tests for useStructuredData hook
 * Verifies structured data generation logic and error handling
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useStructuredData } from '@/hooks/useStructuredData';

// Mock the AI SDK hook
vi.mock('@ai-sdk/react', () => ({
  experimental_useObject: vi.fn(),
}));

// Mock the schema getter
vi.mock('@/lib/schemas', () => ({
  getSchema: vi.fn(() => ({ 
    type: 'object',
    properties: {}
  })),
}));

import { experimental_useObject } from '@ai-sdk/react';

describe('useStructuredData', () => {
  const mockSubmitObject = vi.fn();
  const mockUseObject = experimental_useObject as any;

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Default mock implementation
    mockUseObject.mockReturnValue({
      object: undefined,
      submit: mockSubmitObject,
      isLoading: false,
      error: undefined,
    });
  });

  it('should initialize with default state', () => {
    const { result } = renderHook(() =>
      useStructuredData({ schemaType: 'roadBike' })
    );

    expect(result.current.object).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeUndefined();
    expect(result.current.displayError).toBeNull();
    expect(result.current.hasGenerated).toBe(false);
  });

  it('should expose submit and reset functions', () => {
    const { result } = renderHook(() =>
      useStructuredData({ schemaType: 'roadBike' })
    );

    expect(typeof result.current.submit).toBe('function');
    expect(typeof result.current.reset).toBe('function');
  });

  it('should call submitObject with correct parameters on submit', () => {
    const { result } = renderHook(() =>
      useStructuredData({ schemaType: 'roadBike' })
    );

    act(() => {
      result.current.submit('Canyon Ultimate CF SLX');
    });

    expect(mockSubmitObject).toHaveBeenCalledWith({
      prompt: 'Canyon Ultimate CF SLX',
      schemaType: 'roadBike',
    });
  });

  it('should set hasGenerated to true after submit', () => {
    const { result } = renderHook(() =>
      useStructuredData({ schemaType: 'roadBike' })
    );

    expect(result.current.hasGenerated).toBe(false);

    act(() => {
      result.current.submit('Test input');
    });

    expect(result.current.hasGenerated).toBe(true);
  });

  it('should not submit empty or whitespace-only input', () => {
    const { result } = renderHook(() =>
      useStructuredData({ schemaType: 'roadBike' })
    );

    result.current.submit('   ');

    expect(mockSubmitObject).not.toHaveBeenCalled();
  });

  it('should not submit when loading', () => {
    mockUseObject.mockReturnValue({
      object: undefined,
      submit: mockSubmitObject,
      isLoading: true,
      error: undefined,
    });

    const { result } = renderHook(() =>
      useStructuredData({ schemaType: 'roadBike' })
    );

    result.current.submit('Test input');

    expect(mockSubmitObject).not.toHaveBeenCalled();
  });

  it('should set displayError when error occurs', async () => {
    const errorMessage = 'API rate limit exceeded';
    const error = new Error(errorMessage);

    mockUseObject.mockReturnValue({
      object: undefined,
      submit: mockSubmitObject,
      isLoading: false,
      error,
    });

    const { result } = renderHook(() =>
      useStructuredData({ schemaType: 'roadBike' })
    );

    await waitFor(() => {
      expect(result.current.displayError).toBe(errorMessage);
    });
  });

  it('should detect failed generation (no object, no error, but has generated)', async () => {
    mockUseObject.mockReturnValue({
      object: undefined,
      submit: mockSubmitObject,
      isLoading: false,
      error: undefined,
    });

    const { result, rerender } = renderHook(() =>
      useStructuredData({ schemaType: 'roadBike' })
    );

    // Submit to set hasGenerated
    result.current.submit('Test input');
    
    // Simulate loading finishing with no result
    mockUseObject.mockReturnValue({
      object: undefined,
      submit: mockSubmitObject,
      isLoading: false,
      error: undefined,
    });

    rerender();

    await waitFor(() => {
      expect(result.current.displayError).toBeTruthy();
    });
  });

  it('should return object when generation succeeds', () => {
    const mockObject = {
      brand: 'Canyon',
      model: 'Ultimate CF SLX',
      price: 3999,
    };

    mockUseObject.mockReturnValue({
      object: mockObject,
      submit: mockSubmitObject,
      isLoading: false,
      error: undefined,
    });

    const { result } = renderHook(() =>
      useStructuredData({ schemaType: 'roadBike' })
    );

    expect(result.current.object).toEqual(mockObject);
  });

  it('should reflect loading state from useObject', () => {
    mockUseObject.mockReturnValue({
      object: undefined,
      submit: mockSubmitObject,
      isLoading: true,
      error: undefined,
    });

    const { result } = renderHook(() =>
      useStructuredData({ schemaType: 'roadBike' })
    );

    expect(result.current.isLoading).toBe(true);
  });

  it('should handle different schema types', () => {
    const schemaTypes = ['roadBike', 'album', 'recipe'] as const;

    schemaTypes.forEach(schemaType => {
      const { result } = renderHook(() =>
        useStructuredData({ schemaType })
      );

      result.current.submit('Test input');

      expect(mockSubmitObject).toHaveBeenCalledWith(
        expect.objectContaining({ schemaType })
      );

      vi.clearAllMocks();
    });
  });

  it('should handle error without message', async () => {
    const error = { toString: () => 'Error object' } as any;

    mockUseObject.mockReturnValue({
      object: undefined,
      submit: mockSubmitObject,
      isLoading: false,
      error,
    });

    const { result } = renderHook(() =>
      useStructuredData({ schemaType: 'roadBike' })
    );

    await waitFor(() => {
      expect(result.current.displayError).toBe('Error object');
    });
  });
});
