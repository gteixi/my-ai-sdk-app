/**
 * Utility functions for parsing and formatting API error messages
 */

import type { ErrorDetails } from '@/types/structured';

/**
 * Parses error details from API error messages
 * Extracts quota metrics, limits, model info, and retry timing
 * 
 * @param errorMessage - The raw error message from the API
 * @returns Parsed error details with structured information
 */
export function parseErrorDetails(errorMessage: string): ErrorDetails {
  const details: ErrorDetails = {
    metric: null,
    limit: null,
    model: null,
    retryIn: null,
  };

  // Extract metric (e.g., "Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests")
  const metricMatch = errorMessage.match(/Quota exceeded for metric: ([^,]+)/i);
  if (metricMatch) {
    details.metric = metricMatch[1].split('/').pop() || metricMatch[1];
  }

  // Extract limit (e.g., "limit: 20")
  const limitMatch = errorMessage.match(/limit: (\d+)/i);
  if (limitMatch) {
    details.limit = limitMatch[1];
  }

  // Extract model (e.g., "model: gemini-2.5-flash")
  const modelMatch = errorMessage.match(/model: ([^,\s]+)/i);
  if (modelMatch) {
    details.model = modelMatch[1];
  }

  // Extract retry time (e.g., "Please retry in 55.249495162s")
  const retryMatch = errorMessage.match(/retry in ([\d.]+)s/i);
  if (retryMatch) {
    const seconds = Math.ceil(parseFloat(retryMatch[1]));
    if (seconds < 60) {
      details.retryIn = `${seconds} seconds`;
    } else {
      const minutes = Math.ceil(seconds / 60);
      details.retryIn = `${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
  }

  return details;
}

/**
 * Determines if an error is related to API quota/rate limiting
 * 
 * @param errorMessage - The error message to check
 * @returns True if the error is quota-related
 */
export function isQuotaError(errorMessage: string): boolean {
  const quotaIndicators = [
    'quota',
    'rate limit',
    'RESOURCE_EXHAUSTED',
    'free data limit',
    'Type validation failed',
    'expected object, received undefined',
  ];

  return quotaIndicators.some(indicator => 
    errorMessage.toLowerCase().includes(indicator.toLowerCase())
  );
}

/**
 * Formats a retry time string for display
 * 
 * @param seconds - Number of seconds until retry is allowed
 * @returns Human-readable retry time string
 */
export function formatRetryTime(seconds: number): string {
  if (seconds < 60) {
    return `${seconds} seconds`;
  }
  
  const minutes = Math.ceil(seconds / 60);
  return `${minutes} minute${minutes > 1 ? 's' : ''}`;
}
