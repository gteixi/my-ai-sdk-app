/**
 * Tests for useImageLoader hook
 * Verifies image loading logic and state management
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useImageLoader } from '@/hooks/useImageLoader';

// Mock fetch globally
global.fetch = vi.fn();

describe('useImageLoader', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should initialize with default state', () => {
    const { result } = renderHook(() =>
      useImageLoader({
        object: undefined,
        isLoading: false,
        schemaType: 'roadBike',
      })
    );

    expect(result.current.url).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(false);
  });

  it('should not fetch image when object is undefined', () => {
    renderHook(() =>
      useImageLoader({
        object: undefined,
        isLoading: false,
        schemaType: 'roadBike',
      })
    );

    expect(fetch).not.toHaveBeenCalled();
  });

  it('should not fetch image when isLoading is true', () => {
    const object = { brand: 'Canyon', model: 'Ultimate' };
    
    renderHook(() =>
      useImageLoader({
        object,
        isLoading: true,
        schemaType: 'roadBike',
      })
    );

    expect(fetch).not.toHaveBeenCalled();
  });

  it('should fetch image when object is available and not loading', async () => {
    const mockImageUrl = 'https://example.com/image.jpg';
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ imageUrl: mockImageUrl }),
    });

    const object = { brand: 'Canyon', model: 'Ultimate' };

    const { result } = renderHook(() =>
      useImageLoader({
        object,
        isLoading: false,
        schemaType: 'roadBike',
      })
    );

    await waitFor(() => {
      expect(result.current.url).toBe(mockImageUrl);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(false);
  });

  it('should generate correct query for roadBike schema', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ imageUrl: 'test.jpg' }),
    });

    const object = { brand: 'Canyon', model: 'Ultimate' };

    renderHook(() =>
      useImageLoader({
        object,
        isLoading: false,
        schemaType: 'roadBike',
      })
    );

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('Canyon%20Ultimate%20road%20bike')
      );
    });
  });

  it('should generate correct query for recipe schema', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ imageUrl: 'test.jpg' }),
    });

    const object = { name: 'Carbonara' };

    renderHook(() =>
      useImageLoader({
        object,
        isLoading: false,
        schemaType: 'recipe',
      })
    );

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('Carbonara')
      );
    });
  });

  it('should generate correct query for album schema', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ imageUrl: 'test.jpg' }),
    });

    const object = { title: 'My 21st Century Blues', artist: 'Raye' };

    renderHook(() =>
      useImageLoader({
        object,
        isLoading: false,
        schemaType: 'album',
      })
    );

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('My%2021st%20Century%20Blues%20Raye%20album%20cover')
      );
    });
  });

  it('should set loading state while fetching', async () => {
    let resolvePromise: (value: any) => void;
    const promise = new Promise(resolve => {
      resolvePromise = resolve;
    });

    (global.fetch as any).mockReturnValueOnce(promise);

    const object = { brand: 'Canyon' };

    const { result } = renderHook(() =>
      useImageLoader({
        object,
        isLoading: false,
        schemaType: 'roadBike',
      })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(true);
    });

    resolvePromise!({
      ok: true,
      json: async () => ({ imageUrl: 'test.jpg' }),
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });

  it('should handle fetch errors', async () => {
    (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

    const object = { brand: 'Canyon' };

    const { result } = renderHook(() =>
      useImageLoader({
        object,
        isLoading: false,
        schemaType: 'roadBike',
      })
    );

    await waitFor(() => {
      expect(result.current.error).toBe(true);
    });

    expect(result.current.url).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('should handle non-ok response', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
    });

    const object = { brand: 'Canyon' };

    const { result } = renderHook(() =>
      useImageLoader({
        object,
        isLoading: false,
        schemaType: 'roadBike',
      })
    );

    await waitFor(() => {
      expect(result.current.error).toBe(true);
    });

    expect(result.current.url).toBeNull();
  });

  it('should allow manual error setting', () => {
    const { result } = renderHook(() =>
      useImageLoader({
        object: undefined,
        isLoading: false,
        schemaType: 'roadBike',
      })
    );

    expect(result.current.error).toBe(false);

    act(() => {
      result.current.setError(true);
    });

    expect(result.current.error).toBe(true);
  });

  it('should refetch when object changes', async () => {
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({ imageUrl: 'test.jpg' }),
    });

    const object1 = { brand: 'Canyon', model: 'Ultimate' };

    const { rerender } = renderHook(
      ({ object }) =>
        useImageLoader({
          object,
          isLoading: false,
          schemaType: 'roadBike',
        }),
      { initialProps: { object: object1 } }
    );

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    const object2 = { brand: 'Specialized', model: 'Tarmac' };
    rerender({ object: object2 });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2);
    });
  });

  it('should use fallback query when object fields are missing', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ imageUrl: 'test.jpg' }),
    });

    const object = {}; // Empty object

    renderHook(() =>
      useImageLoader({
        object,
        isLoading: false,
        schemaType: 'roadBike',
      })
    );

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('road%20bike')
      );
    });
  });
});
