/**
 * Input form component for structured data generation
 * Provides textarea for natural language input and submit button
 */

import type { SchemaType } from '@/types/structured';
import { getSchemaMetadata } from '@/lib/constants/examples';

interface InputFormProps {
  input: string;
  isLoading: boolean;
  schemaType: SchemaType;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onLoadExample: () => void;
}

/**
 * Form for entering natural language input and generating structured data
 * Includes example loader button and dynamic placeholder text
 */
export function InputForm({
  input,
  isLoading,
  schemaType,
  onInputChange,
  onSubmit,
  onLoadExample,
}: InputFormProps) {
  const { label } = getSchemaMetadata(schemaType);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium text-gray-700">
          Natural Language Input
        </label>
        <button
          onClick={onLoadExample}
          className="text-xs text-blue-600 hover:text-blue-700 font-medium"
          type="button"
        >
          Load Example
        </button>
      </div>
      
      <form onSubmit={onSubmit}>
        <textarea
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder={`Enter text to extract ${label.toLowerCase()} data...`}
          className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          disabled={isLoading}
        />
        
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Generating...' : 'Generate Structured Data'}
        </button>
      </form>
    </div>
  );
}
