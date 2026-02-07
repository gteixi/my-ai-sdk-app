/**
 * Custom hook for managing structured data generation state
 * Wraps the AI SDK's useObject hook with additional error handling
 */

import { experimental_useObject as useObject } from '@ai-sdk/react';
import { useState, useEffect, useCallback } from 'react';
import type { SchemaType } from '@/types/structured';
import { getSchema } from '@/lib/schemas';

interface UseStructuredDataOptions {
  schemaType: SchemaType;
}

interface UseStructuredDataReturn {
  object: Record<string, unknown> | undefined;
  isLoading: boolean;
  error: Error | undefined;
  displayError: string | null;
  hasGenerated: boolean;
  submit: (input: string) => void;
  reset: () => void;
}

/**
 * Hook to manage structured data generation with error handling
 * 
 * @param options - Configuration options including schema type
 * @returns Object with generation state and control functions
 */
export function useStructuredData({ 
  schemaType 
}: UseStructuredDataOptions): UseStructuredDataReturn {
  const [hasGenerated, setHasGenerated] = useState(false);
  const [displayError, setDisplayError] = useState<string | null>(null);

  const schema = getSchema(schemaType);

  const { object, submit: submitObject, isLoading, error } = useObject({
    api: '/api/structured',
    schema,
    onError: (error) => {
      const errorMessage = error.message || error.toString() || 'An unexpected error occurred';
      setDisplayError(errorMessage);
    },
    onFinish: ({ error }) => {
      if (error) {
        const errorMessage = error.message || error.toString() || 'An unexpected error occurred';
        setDisplayError(errorMessage);
      }
    },
  });

  // Watch for error changes from the hook
  useEffect(() => {
    if (error) {
      const errorMessage = error.message || error.toString() || 'An unexpected error occurred';
      setDisplayError(errorMessage);
    }
  }, [error]);

  // Detect failed generation (loading stops but no object and no error)
  useEffect(() => {
    if (!isLoading && hasGenerated && !object && !error && !displayError) {
      setDisplayError('The free data limit has been exceeded. Please try again in 5 minutes.');
    }
  }, [isLoading, hasGenerated, object, error, displayError]);

  /**
   * Submit input for structured data generation
   */
  const submit = useCallback((input: string) => {
    if (!input.trim() || isLoading) return;
    
    setHasGenerated(true);
    setDisplayError(null);
    
    submitObject({ 
      prompt: input,
      schemaType,
    });
  }, [isLoading, schemaType, submitObject]);

  /**
   * Reset the generation state
   */
  const reset = useCallback(() => {
    setHasGenerated(false);
    setDisplayError(null);
  }, []);

  return {
    object,
    isLoading,
    error,
    displayError,
    hasGenerated,
    submit,
    reset,
  };
}
