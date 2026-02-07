/**
 * Schema information component
 * Displays helpful information about the selected schema when no data has been generated yet
 */

import type { SchemaType } from '@/types/structured';
import { getSchemaMetadata } from '@/lib/constants/examples';

interface SchemaInfoProps {
  schemaType: SchemaType;
}

/**
 * Information box explaining what the selected schema does
 * Only shown before first generation
 */
export function SchemaInfo({ schemaType }: SchemaInfoProps) {
  const { label } = getSchemaMetadata(schemaType);

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-blue-900 mb-2">
        ℹ️ About This Schema
      </h3>
      <p className="text-sm text-blue-800">
        The <strong>{label}</strong> schema will extract structured information
        and validate it against predefined types using Zod. Try the example or enter your own text!
      </p>
    </div>
  );
}
