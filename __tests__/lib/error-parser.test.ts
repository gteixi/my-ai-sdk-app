/**
 * Tests for error parsing utility functions
 */

import { describe, it, expect } from 'vitest';
import { parseErrorDetails, isQuotaError, formatRetryTime } from '@/lib/utils/error-parser';

describe('parseErrorDetails', () => {
  it('should extract metric from error message', () => {
    const message = 'Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests';
    const details = parseErrorDetails(message);
    
    expect(details.metric).toBe('generate_content_free_tier_requests');
  });

  it('should extract limit from error message', () => {
    const message = 'limit: 20';
    const details = parseErrorDetails(message);
    
    expect(details.limit).toBe('20');
  });

  it('should extract model from error message', () => {
    const message = 'model: gemini-2.5-flash';
    const details = parseErrorDetails(message);
    
    expect(details.model).toBe('gemini-2.5-flash');
  });

  it('should extract and format retry time in seconds', () => {
    const message = 'Please retry in 45.5s';
    const details = parseErrorDetails(message);
    
    expect(details.retryIn).toBe('46 seconds');
  });

  it('should extract and format retry time in minutes', () => {
    const message = 'Please retry in 125.7s';
    const details = parseErrorDetails(message);
    
    expect(details.retryIn).toBe('3 minutes');
  });

  it('should return null values for missing information', () => {
    const message = 'Generic error message';
    const details = parseErrorDetails(message);
    
    expect(details.metric).toBeNull();
    expect(details.limit).toBeNull();
    expect(details.model).toBeNull();
    expect(details.retryIn).toBeNull();
  });
});

describe('isQuotaError', () => {
  it('should identify quota errors', () => {
    expect(isQuotaError('quota exceeded')).toBe(true);
    expect(isQuotaError('rate limit reached')).toBe(true);
    expect(isQuotaError('RESOURCE_EXHAUSTED')).toBe(true);
    expect(isQuotaError('free data limit')).toBe(true);
  });

  it('should identify validation errors as quota-related', () => {
    expect(isQuotaError('Type validation failed')).toBe(true);
    expect(isQuotaError('expected object, received undefined')).toBe(true);
  });

  it('should not identify regular errors as quota errors', () => {
    expect(isQuotaError('Network error')).toBe(false);
    expect(isQuotaError('Invalid API key')).toBe(false);
    expect(isQuotaError('Server error 500')).toBe(false);
  });

  it('should be case-insensitive', () => {
    expect(isQuotaError('QUOTA EXCEEDED')).toBe(true);
    expect(isQuotaError('Rate Limit')).toBe(true);
  });
});

describe('formatRetryTime', () => {
  it('should format seconds correctly', () => {
    expect(formatRetryTime(30)).toBe('30 seconds');
    expect(formatRetryTime(1)).toBe('1 seconds');
    expect(formatRetryTime(59)).toBe('59 seconds');
  });

  it('should format minutes correctly', () => {
    expect(formatRetryTime(60)).toBe('1 minute');
    expect(formatRetryTime(120)).toBe('2 minutes');
    expect(formatRetryTime(125)).toBe('3 minutes'); // Rounds up
  });

  it('should handle edge cases', () => {
    expect(formatRetryTime(0)).toBe('0 seconds');
    expect(formatRetryTime(61)).toBe('2 minutes'); // Rounds up
  });
});
