/**
 * Tests for SchemaSelector component
 * Verifies schema selection UI and interactions
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SchemaSelector } from '@/components/structured/SchemaSelector';
import type { SchemaType } from '@/types/structured';

describe('SchemaSelector', () => {
  const mockOnSchemaChange = vi.fn();

  it('should render all schema type buttons', () => {
    render(
      <SchemaSelector 
        selectedSchema="roadBike" 
        onSchemaChange={mockOnSchemaChange} 
      />
    );

    expect(screen.getByRole('button', { name: /Road Bike/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Album/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Recipe/i })).toBeInTheDocument();
  });

  it('should highlight the selected schema button', () => {
    render(
      <SchemaSelector 
        selectedSchema="album" 
        onSchemaChange={mockOnSchemaChange} 
      />
    );

    const albumButton = screen.getByRole('button', { name: /Album/i });
    const bikeButton = screen.getByRole('button', { name: /Road Bike/i });

    // Selected button should have active styles
    expect(albumButton).toHaveClass('bg-blue-600', 'text-white');
    // Non-selected button should have default styles
    expect(bikeButton).toHaveClass('bg-white', 'text-gray-700');
  });

  it('should call onSchemaChange when a button is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <SchemaSelector 
        selectedSchema="roadBike" 
        onSchemaChange={mockOnSchemaChange} 
      />
    );

    const albumButton = screen.getByRole('button', { name: /Album/i });
    await user.click(albumButton);

    expect(mockOnSchemaChange).toHaveBeenCalledWith('album');
    expect(mockOnSchemaChange).toHaveBeenCalledTimes(1);
  });

  it('should have proper aria-pressed attribute', () => {
    render(
      <SchemaSelector 
        selectedSchema="recipe" 
        onSchemaChange={mockOnSchemaChange} 
      />
    );

    const recipeButton = screen.getByRole('button', { name: /Recipe/i });
    const bikeButton = screen.getByRole('button', { name: /Road Bike/i });

    expect(recipeButton).toHaveAttribute('aria-pressed', 'true');
    expect(bikeButton).toHaveAttribute('aria-pressed', 'false');
  });

  it('should display icons with labels', () => {
    render(
      <SchemaSelector 
        selectedSchema="roadBike" 
        onSchemaChange={mockOnSchemaChange} 
      />
    );

    const bikeButton = screen.getByRole('button', { name: /Road Bike/i });
    expect(bikeButton.textContent).toMatch(/🚴/); // Icon should be present
    expect(bikeButton.textContent).toMatch(/Road Bike/); // Label should be present
  });

  it('should allow switching between schemas', async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <SchemaSelector 
        selectedSchema="roadBike" 
        onSchemaChange={mockOnSchemaChange} 
      />
    );

    // Click recipe button
    await user.click(screen.getByRole('button', { name: /Recipe/i }));
    expect(mockOnSchemaChange).toHaveBeenCalledWith('recipe');

    // Simulate parent component updating selectedSchema
    rerender(
      <SchemaSelector 
        selectedSchema="recipe" 
        onSchemaChange={mockOnSchemaChange} 
      />
    );

    // Recipe button should now be active
    expect(screen.getByRole('button', { name: /Recipe/i })).toHaveClass('bg-blue-600');
  });
});
