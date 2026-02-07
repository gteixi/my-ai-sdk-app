/**
 * Structured Data Generation Page
 * 
 * Demonstrates AI SDK's structured data generation with Zod schemas
 * Extracts typed JSON objects from natural language descriptions
 * 
 * Features:
 * - Three schema types: Road Bike, Album, Recipe
 * - Real-time validation with Zod
 * - Side-by-side JSON and rendered view
 * - Automatic image fetching for generated objects
 * - Comprehensive error handling with rate limit detection
 */

'use client';

import { useState } from 'react';
import type { SchemaType } from '@/types/structured';
import { getRandomExample } from '@/lib/constants/examples';
import { useStructuredData } from '@/hooks/useStructuredData';
import { useImageLoader } from '@/hooks/useImageLoader';
import { SchemaSelector } from '@/components/structured/SchemaSelector';
import { InputForm } from '@/components/structured/InputForm';
import { ErrorDisplay } from '@/components/structured/ErrorDisplay';
import { ResultsView } from '@/components/structured/ResultsView';
import { SchemaInfo } from '@/components/structured/SchemaInfo';

/**
 * Main page component for structured data generation
 * Manages schema selection, input, and generation flow
 */
export default function StructuredPage() {
  // Schema and input state
  const [selectedSchema, setSelectedSchema] = useState<SchemaType>('roadBike');
  const [input, setInput] = useState(getRandomExample('roadBike'));

  // Structured data generation hook
  const {
    object,
    isLoading,
    error,
    displayError,
    hasGenerated,
    submit,
    reset,
  } = useStructuredData({ schemaType: selectedSchema });

  // Image loading hook
  const imageState = useImageLoader({
    object,
    isLoading,
    schemaType: selectedSchema,
  });

  /**
   * Handles form submission
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit(input);
  };

  /**
   * Loads a random example for the current schema
   */
  const handleLoadExample = () => {
    const example = getRandomExample(selectedSchema);
    setInput(example);
    reset();
  };

  /**
   * Changes the selected schema and loads a new example
   */
  const handleSchemaChange = (schema: SchemaType) => {
    setSelectedSchema(schema);
    setInput(getRandomExample(schema));
    reset();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 px-4 py-3">
        <h1 className="text-lg font-semibold text-gray-900">
          Structured Data Generation
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Extract typed JSON objects from natural language using Zod schemas
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-6">
          {/* Schema Type Selector */}
          <SchemaSelector
            selectedSchema={selectedSchema}
            onSchemaChange={handleSchemaChange}
          />

          {/* Input Form */}
          <InputForm
            input={input}
            isLoading={isLoading}
            schemaType={selectedSchema}
            onInputChange={setInput}
            onSubmit={handleSubmit}
            onLoadExample={handleLoadExample}
          />

          {/* Error Display */}
          <ErrorDisplay error={error} displayError={displayError} />

          {/* Results: JSON + Rendered View */}
          {hasGenerated && (
            <ResultsView
              schemaType={selectedSchema}
              object={object}
              imageState={imageState}
              onImageError={() => imageState.setError(true)}
            />
          )}

          {/* Schema Information */}
          {!hasGenerated && <SchemaInfo schemaType={selectedSchema} />}
        </div>
      </div>
    </div>
  );
}
