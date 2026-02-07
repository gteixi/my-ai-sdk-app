/**
 * Tests for ErrorDisplay component
 * Verifies error message rendering and quota error handling
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorDisplay } from '@/components/structured/ErrorDisplay';

describe('ErrorDisplay', () => {
  it('should render nothing when no error is provided', () => {
    const { container } = render(<ErrorDisplay error={undefined} displayError={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render error message from Error object', () => {
    const error = new Error('Test error message');
    render(<ErrorDisplay error={error} displayError={null} />);

    expect(screen.getByText(/Test error message/i)).toBeInTheDocument();
  });

  it('should render displayError string when provided', () => {
    render(<ErrorDisplay error={undefined} displayError="Custom error message" />);

    expect(screen.getByText(/Custom error message/i)).toBeInTheDocument();
  });

  it('should prioritize displayError over Error object', () => {
    const error = new Error('Error object message');
    render(<ErrorDisplay error={error} displayError="Display error message" />);

    expect(screen.getByText(/Display error message/i)).toBeInTheDocument();
    expect(screen.queryByText(/Error object message/i)).not.toBeInTheDocument();
  });

  it('should show quota-specific title for quota errors', () => {
    const quotaError = 'API Limit Exceeded: Resource has been exhausted';
    render(<ErrorDisplay error={undefined} displayError={quotaError} />);

    expect(screen.getByText(/API Limit Exceeded/i)).toBeInTheDocument();
  });

  it('should show generic title for non-quota errors', () => {
    const error = new Error('Network error');
    render(<ErrorDisplay error={error} displayError={null} />);

    expect(screen.getByText(/Generation Error/i)).toBeInTheDocument();
  });

  it('should parse and display error limit information', () => {
    const quotaError = 'API Limit Exceeded. Limit: 15 requests per minute';
    render(<ErrorDisplay error={undefined} displayError={quotaError} />);

    expect(screen.getByText(/15 requests per minute/i)).toBeInTheDocument();
  });

  it('should show helpful guidance for quota errors', () => {
    const quotaError = 'RESOURCE_EXHAUSTED: Quota exceeded';
    render(<ErrorDisplay error={undefined} displayError={quotaError} />);

    expect(screen.getByText(/What you can do:/i)).toBeInTheDocument();
    expect(screen.getByText(/free tier has limited requests/i)).toBeInTheDocument();
  });

  it('should render helpful links for quota errors', () => {
    const quotaError = 'RESOURCE_EXHAUSTED: Quota exceeded';
    render(<ErrorDisplay error={undefined} displayError={quotaError} />);

    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
    
    const geminiLink = links.find(link => 
      link.getAttribute('href')?.includes('gemini-api')
    );
    expect(geminiLink).toBeInTheDocument();
    expect(geminiLink).toHaveAttribute('target', '_blank');
    expect(geminiLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should not show guidance section for non-quota errors', () => {
    const error = new Error('Network timeout');
    render(<ErrorDisplay error={error} displayError={null} />);

    expect(screen.queryByText(/What you can do:/i)).not.toBeInTheDocument();
  });

  it('should render warning emoji', () => {
    const error = new Error('Test error');
    const { container } = render(<ErrorDisplay error={error} displayError={null} />);

    expect(container.textContent).toMatch(/⚠️/);
  });

  it('should have proper styling classes', () => {
    const error = new Error('Test error');
    const { container } = render(<ErrorDisplay error={error} displayError={null} />);

    const errorBox = container.querySelector('.bg-red-50');
    expect(errorBox).toBeInTheDocument();
    expect(errorBox).toHaveClass('border-l-4', 'border-red-500');
  });

  it('should handle various quota error patterns', () => {
    const errorPatterns = [
      'RESOURCE_EXHAUSTED',
      'quota exceeded',
      'rate limit',
      'free data limit',
    ];

    errorPatterns.forEach(pattern => {
      const { unmount } = render(<ErrorDisplay error={undefined} displayError={pattern} />);
      expect(screen.getByText(/API Limit Exceeded/i)).toBeInTheDocument();
      unmount();
    });
  });

  it('should display note about incomplete response for quota errors', () => {
    const quotaError = 'RESOURCE_EXHAUSTED: Quota exceeded';
    render(<ErrorDisplay error={undefined} displayError={quotaError} />);

    expect(screen.getByText(/API returned an incomplete response/i)).toBeInTheDocument();
  });

  it('should handle error message with model information', () => {
    const errorWithModel = 'RESOURCE_EXHAUSTED for model gemini-2.5-flash: quota exceeded';
    render(<ErrorDisplay error={undefined} displayError={errorWithModel} />);

    // Should still detect as quota error
    expect(screen.getByText(/API Limit Exceeded/i)).toBeInTheDocument();
  });

  it('should render fallback message for empty error', () => {
    const error = new Error('');
    render(<ErrorDisplay error={error} displayError={null} />);

    expect(screen.getByText(/An error occurred/i)).toBeInTheDocument();
  });
});
