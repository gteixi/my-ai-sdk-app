/**
 * Tests for InputForm component
 * Verifies form input, submission, and example loading
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InputForm } from '@/components/structured/InputForm';

describe('InputForm', () => {
  const defaultProps = {
    input: '',
    isLoading: false,
    schemaType: 'roadBike' as const,
    onInputChange: vi.fn(),
    onSubmit: vi.fn(),
    onLoadExample: vi.fn(),
  };

  it('should render textarea with proper placeholder', () => {
    render(<InputForm {...defaultProps} />);

    const textarea = screen.getByPlaceholderText(/Enter text to extract road bike data/i);
    expect(textarea).toBeInTheDocument();
    expect(textarea).not.toBeDisabled();
  });

  it('should render submit button with correct text', () => {
    render(<InputForm {...defaultProps} />);

    const submitButton = screen.getByRole('button', { name: /Generate Structured Data/i });
    expect(submitButton).toBeInTheDocument();
  });

  it('should render load example button', () => {
    render(<InputForm {...defaultProps} />);

    const exampleButton = screen.getByRole('button', { name: /Load Example/i });
    expect(exampleButton).toBeInTheDocument();
  });

  it('should call onInputChange when typing in textarea', async () => {
    const user = userEvent.setup();
    const onInputChange = vi.fn();

    render(<InputForm {...defaultProps} onInputChange={onInputChange} />);

    const textarea = screen.getByPlaceholderText(/Enter text to extract road bike data/i);
    await user.type(textarea, 'Test input');

    expect(onInputChange).toHaveBeenCalled();
    // Called once per character typed
    expect(onInputChange).toHaveBeenCalledTimes(10); // "Test input" = 10 chars
  });

  it('should call onSubmit when form is submitted', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn((e) => e.preventDefault());

    render(<InputForm {...defaultProps} input="Canyon Ultimate" onSubmit={onSubmit} />);

    const submitButton = screen.getByRole('button', { name: /Generate Structured Data/i });
    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('should call onLoadExample when example button is clicked', async () => {
    const user = userEvent.setup();
    const onLoadExample = vi.fn();

    render(<InputForm {...defaultProps} onLoadExample={onLoadExample} />);

    const exampleButton = screen.getByRole('button', { name: /Load Example/i });
    await user.click(exampleButton);

    expect(onLoadExample).toHaveBeenCalledTimes(1);
  });

  it('should disable submit button when input is empty', () => {
    render(<InputForm {...defaultProps} input="" />);

    const submitButton = screen.getByRole('button', { name: /Generate Structured Data/i });
    expect(submitButton).toBeDisabled();
  });

  it('should disable submit button when input is only whitespace', () => {
    render(<InputForm {...defaultProps} input="   " />);

    const submitButton = screen.getByRole('button', { name: /Generate Structured Data/i });
    expect(submitButton).toBeDisabled();
  });

  it('should enable submit button when input has content', () => {
    render(<InputForm {...defaultProps} input="Some content" />);

    const submitButton = screen.getByRole('button', { name: /Generate Structured Data/i });
    expect(submitButton).not.toBeDisabled();
  });

  it('should show loading state when isLoading is true', () => {
    render(<InputForm {...defaultProps} input="Test" isLoading={true} />);

    const submitButton = screen.getByRole('button', { name: /Generating.../i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('should disable textarea when loading', () => {
    render(<InputForm {...defaultProps} isLoading={true} />);

    const textarea = screen.getByPlaceholderText(/Enter text to extract road bike data/i);
    expect(textarea).toBeDisabled();
  });

  it('should update placeholder based on schema type', () => {
    const { rerender } = render(<InputForm {...defaultProps} schemaType="roadBike" />);
    expect(screen.getByPlaceholderText(/Enter text to extract road bike data/i)).toBeInTheDocument();

    rerender(<InputForm {...defaultProps} schemaType="album" />);
    expect(screen.getByPlaceholderText(/Enter text to extract music album data/i)).toBeInTheDocument();

    rerender(<InputForm {...defaultProps} schemaType="recipe" />);
    expect(screen.getByPlaceholderText(/Enter text to extract recipe data/i)).toBeInTheDocument();
  });

  it('should display input value in textarea', () => {
    render(<InputForm {...defaultProps} input="Canyon Ultimate CF SLX" />);

    const textarea = screen.getByDisplayValue('Canyon Ultimate CF SLX');
    expect(textarea).toBeInTheDocument();
  });

  it('should have proper form structure', () => {
    render(<InputForm {...defaultProps} />);

    const textarea = screen.getByRole('textbox');
    const form = textarea.closest('form');
    expect(form).toBeInTheDocument();
  });
});
