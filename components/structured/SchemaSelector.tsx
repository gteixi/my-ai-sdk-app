/**
 * Schema selector component
 * Allows users to choose between different schema types (Road Bike, Album, Recipe)
 */

import type { SchemaType } from '@/types/structured';
import { SCHEMA_EXAMPLES } from '@/lib/constants/examples';

interface SchemaSelectorProps {
  selectedSchema: SchemaType;
  onSchemaChange: (schema: SchemaType) => void;
}

/**
 * Renders buttons for selecting schema types
 * Active schema is highlighted with blue background
 */
export function SchemaSelector({ selectedSchema, onSchemaChange }: SchemaSelectorProps) {
  const schemaTypes = Object.keys(SCHEMA_EXAMPLES) as SchemaType[];

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Schema Type
      </label>
      <div className="flex flex-wrap gap-2">
        {schemaTypes.map((schema) => {
          const { icon, label } = SCHEMA_EXAMPLES[schema];
          const isActive = selectedSchema === schema;

          return (
            <button
              key={schema}
              onClick={() => onSchemaChange(schema)}
              className={`
                px-4 py-2 rounded-lg font-medium transition-all
                ${isActive
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-400'
                }
              `}
              aria-pressed={isActive}
              aria-label={`Select ${label} schema`}
            >
              {icon} {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
