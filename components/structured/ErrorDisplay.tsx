/**
 * Error display component
 * Shows API errors with helpful information and retry guidance
 */

import { parseErrorDetails, isQuotaError } from '@/lib/utils/error-parser';

interface ErrorDisplayProps {
  error: Error | undefined;
  displayError: string | null;
}

/**
 * Displays error messages with special handling for quota/rate limit errors
 * Provides helpful guidance on what users can do to resolve the issue
 */
export function ErrorDisplay({ error, displayError }: ErrorDisplayProps) {
  if (!error && !displayError) return null;

  const errorMessage = displayError || error?.message || 'An error occurred';
  const isQuota = isQuotaError(errorMessage);
  const errorDetails = parseErrorDetails(errorMessage);

  return (
    <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
      <div className="flex items-start gap-3">
        <span className="text-2xl" aria-hidden="true">⚠️</span>
        
        <div className="flex-1">
          <p className="text-sm font-semibold text-red-900 mb-2">
            {isQuota ? '🚫 API Limit Exceeded' : '❌ Generation Error'}
          </p>
          
          {/* Quota-specific error message */}
          {isQuota ? (
            <div className="text-sm text-red-800 mb-3 space-y-2">
              <p className="font-semibold">You've exceeded your free API quota limit.</p>
              
              {errorDetails.limit && (
                <p>
                  <strong>Limit:</strong> {errorDetails.limit} requests per minute (free tier)
                </p>
              )}
              
              {errorDetails.retryIn ? (
                <p className="font-bold text-red-900 text-base mt-2">
                  ⏱️ Try again in: {errorDetails.retryIn}
                </p>
              ) : (
                <p className="font-bold text-red-900 text-base mt-2">
                  ⏱️ Try again in: 5 minutes
                </p>
              )}
              
              <p className="text-xs text-red-700 mt-2 italic">
                Note: The API returned an incomplete response due to rate limiting.
              </p>
            </div>
          ) : (
            <p className="text-sm text-red-800 mb-3">{errorMessage}</p>
          )}
          
          {/* Helpful guidance for quota errors */}
          {isQuota && (
            <div className="mt-3 p-3 bg-red-100 rounded text-sm text-red-900">
              <p className="font-medium mb-2">💡 What you can do:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Wait {errorDetails.retryIn || '5 minutes'} before trying again</li>
                <li>The free tier has limited requests per minute</li>
                <li>
                  Check your usage at:{' '}
                  <a 
                    href="https://ai.dev/rate-limit" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="underline hover:text-red-700"
                  >
                    ai.dev/rate-limit
                  </a>
                </li>
                <li>
                  Learn more:{' '}
                  <a 
                    href="https://ai.google.dev/gemini-api/docs/rate-limits" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="underline hover:text-red-700"
                  >
                    Gemini API Docs
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
