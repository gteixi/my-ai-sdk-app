# AGENTS.md

AI agent guidance for developing and maintaining this AI SDK demo application.

## Project Overview

**AI SDK Demo** - A Next.js 15 application showcasing Vercel AI SDK 6 with Google Gemini. Three core demonstrations:

1. **💬 Streaming Chat** - Real-time AI conversations with markdown formatting
2. **🛠️ Tool Calling** - AI agents that use external APIs (weather, calculator, time)
3. **📊 Structured Data** - Extract typed JSON from natural language (recipes, albums, bikes)

**Tech Stack:** Next.js 15, React 19, TypeScript, Vercel AI SDK 6, Google Gemini 2.5 Flash, Tailwind CSS

## Quick Start

```bash
# Install dependencies
pnpm install

# Development (http://localhost:3000)
pnpm dev

# Production build
pnpm build

# Run tests
pnpm test

# Run tests with UI
pnpm test:ui

# Environment: .env.local
GOOGLE_GENERATIVE_AI_API_KEY=your_key_here
```

Get free API key: https://aistudio.google.com/app/apikey

## Architecture Philosophy

This project follows **SOLID principles** and **Vercel React best practices**:

### 1. Single Responsibility
- Each component has ONE clear purpose
- Hooks encapsulate specific logic (data fetching, image loading)
- Utility functions are pure and focused

### 2. Component Architecture
```
Page Component (orchestration)
  ↓
Custom Hooks (business logic)
  ↓
UI Components (presentation)
  ↓
Utility Functions (helpers)
```

### 3. Code Organization Patterns

**GOOD - Modular Structure:**
```typescript
// Separate concerns
import { useStructuredData } from '@/hooks/useStructuredData';
import { SchemaSelector } from '@/components/structured/SchemaSelector';

function MyPage() {
  const { object, submit } = useStructuredData({ schemaType: 'recipe' });
  return <SchemaSelector onSelect={handleSelect} />;
}
```

**BAD - Monolithic:**
```typescript
// Everything in one file
function MyPage() {
  // 500 lines of mixed logic, UI, and state management
}
```

## Project Structure

```
app/
├── api/                    # API routes (server-side)
│   ├── chat/route.ts      # Streaming chat endpoint
│   ├── tools/route.ts     # Tool calling endpoint
│   └── structured/route.ts # Structured data endpoint
├── chat/page.tsx          # Chat UI (124 lines)
├── tools/page.tsx         # Tools UI
├── structured/page.tsx    # Structured data UI (124 lines, refactored from 676)
└── layout.tsx             # Root layout

components/
├── chat/                  # Chat UI components
│   ├── ChatMessage.tsx   # Message bubble with markdown
│   ├── ChatInput.tsx     # Input field
│   └── ToolCallDisplay.tsx # Tool execution display
├── structured/            # Structured data components
│   ├── SchemaSelector.tsx
│   ├── InputForm.tsx
│   ├── ErrorDisplay.tsx
│   ├── ResultsView.tsx
│   └── renderers/         # Type-specific renderers
│       ├── RecipeRenderer.tsx
│       ├── AlbumRenderer.tsx
│       └── RoadBikeRenderer.tsx
└── Navigation.tsx         # Top navigation

hooks/
├── useStructuredData.ts   # Structured data generation logic
└── useImageLoader.ts      # Image fetching logic

lib/
├── schemas/               # Zod validation schemas
├── constants/             # App constants
└── utils/                 # Pure utility functions

types/
├── chat.ts               # Chat type definitions
└── structured.ts         # Structured data types
```

## Development Guidelines

### React Best Practices

#### 1. Bundle Size Optimization (CRITICAL)
```typescript
// ✅ GOOD - Direct imports
import { SchemaSelector } from '@/components/structured/SchemaSelector';

// ❌ BAD - Barrel imports (slower builds)
import { SchemaSelector } from '@/components/structured';
```

#### 2. Async Operations (CRITICAL)
```typescript
// ✅ GOOD - Parallel fetching
const [data1, data2] = await Promise.all([
  fetch('/api/endpoint1'),
  fetch('/api/endpoint2')
]);

// ❌ BAD - Waterfall
const data1 = await fetch('/api/endpoint1');
const data2 = await fetch('/api/endpoint2');
```

#### 3. Re-render Optimization
```typescript
// ✅ GOOD - Memoize expensive computations
const filteredItems = useMemo(
  () => items.filter(item => item.active),
  [items]
);

// ✅ GOOD - Functional setState for stability
const increment = useCallback(() => {
  setCount(prev => prev + 1);
}, []);

// ❌ BAD - Recreating on every render
const filteredItems = items.filter(item => item.active);
```

#### 4. Component Composition
```typescript
// ✅ GOOD - Extract reusable components
function ImageDisplay({ url, loading, error, alt, onError }) {
  // Reusable image component
}

function RecipeRenderer({ data, imageState }) {
  return <ImageDisplay {...imageState} alt="Recipe" />;
}

// ❌ BAD - Duplicate code
function RecipeRenderer({ data }) {
  return <img src={imageUrl} />; // Same in 3 places
}
```

#### 5. Type Safety
```typescript
// ✅ GOOD - Proper typing
interface SchemaSelector Props {
  selectedSchema: SchemaType;
  onSchemaChange: (schema: SchemaType) => void;
}

// ❌ BAD - Using any
function SchemaSelector({ onSchemaChange }: { onSchemaChange: any }) {}
```

### AI SDK Patterns

#### Chat Pattern
```typescript
// Simple streaming chat
const { messages, input, handleSubmit } = useChat({
  api: '/api/chat',
  onError: (error) => console.error(error),
});
```

#### Tool Calling Pattern
```typescript
// Define tools with Zod schemas
const tools = {
  calculator: tool({
    description: 'Perform mathematical calculations',
    parameters: z.object({
      expression: z.string().describe('Math expression to evaluate'),
    }),
    execute: async ({ expression }) => {
      return { result: eval(expression) };
    },
  }),
};

// Use in streamText
const result = streamText({
  model: google('gemini-2.5-flash'),
  tools,
  maxSteps: 5,
});
```

#### Structured Data Pattern
```typescript
// Extract typed objects
const { object, submit, isLoading } = useObject({
  api: '/api/structured',
  schema: recipeSchema,
});

submit({ prompt: 'Italian pasta carbonara recipe' });
```

## Testing

The project uses **Vitest** and **React Testing Library** for comprehensive test coverage.

### Test Structure
```
__tests__/
├── lib/                    # Utility function tests
│   ├── error-parser.test.ts
│   ├── examples.test.ts
│   └── schemas.test.ts
├── hooks/                  # Custom hook tests
│   ├── useImageLoader.test.ts
│   └── useStructuredData.test.ts
└── components/            # Component tests
    └── structured/
        ├── SchemaSelector.test.tsx
        ├── InputForm.test.tsx
        └── ErrorDisplay.test.tsx
```

### Running Tests
```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test

# Run tests with UI
pnpm test:ui
```

### Writing Tests
```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText(/hello/i)).toBeInTheDocument();
  });
});
```

**Test Coverage:** 99+ passing tests across utilities, hooks, and components

## Feature Implementation Guide

### Adding a New Schema Type

1. **Define Types** (`types/structured.ts`)
```typescript
export interface NewType {
  field1: string;
  field2: number;
}
```

2. **Create Zod Schema** (`lib/schemas/index.ts`)
```typescript
export const newTypeSchema = z.object({
  field1: z.string(),
  field2: z.number(),
});
```

3. **Add Examples** (`lib/constants/examples.ts`)
```typescript
newType: {
  label: 'New Type',
  icon: '🎯',
  examples: ['example 1', 'example 2'],
}
```

4. **Create Renderer** (`components/structured/renderers/NewTypeRenderer.tsx`)
```typescript
export function NewTypeRenderer({ data, imageState, onImageError }) {
  return <div>{/* Render logic */}</div>;
}
```

5. **Update ResultsView** (`components/structured/ResultsView.tsx`)
```typescript
case 'newType':
  return <NewTypeRenderer data={data as NewType} />;
```

### Adding a New Tool

1. **Define in API** (`app/api/tools/route.ts`)
```typescript
myTool: tool({
  description: 'Description for AI',
  parameters: z.object({
    param: z.string(),
  }),
  execute: async ({ param }) => {
    return { result: 'value' };
  },
}),
```

2. **Add Icon Mapping** (`components/chat/ToolCallDisplay.tsx`)
```typescript
const toolIcons: Record<string, string> = {
  myTool: '🔧',
};
```

## Code Quality Standards

### SOLID Principles
- **S** - Single Responsibility: One component, one job
- **O** - Open/Closed: Extend via composition, not modification
- **L** - Liskov Substitution: Renderers implement common interface
- **I** - Interface Segregation: Small, focused prop types
- **D** - Dependency Inversion: Depend on hooks/types, not implementations

### Key Metrics
- Main page components: < 150 lines
- Utility functions: < 50 lines
- Custom hooks: < 100 lines
- Renderer components: < 150 lines
- Zero `any` types (use proper TypeScript)
- 100% type coverage

### Performance Targets
- First Load JS: < 250 KB
- Initial page load: < 2s
- Time to Interactive: < 3s
- Build time: < 30s

## Troubleshooting

### Common Issues

**Build Errors:**
- Clear `.next` cache: `rm -rf .next && pnpm build`
- Check TypeScript errors: `pnpm tsc --noEmit`

**API Rate Limits:**
- Gemini free tier: 15 requests/minute
- Implement exponential backoff
- Show user-friendly error messages

**Type Errors:**
- Use `as unknown as Type` for complex type assertions
- Avoid `any` - use `unknown` if type is truly unknown
- Define interfaces for all props

## Resources

- [Vercel AI SDK Docs](https://sdk.vercel.ai)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Google Gemini API](https://ai.google.dev/gemini-api/docs)
- [Zod Documentation](https://zod.dev)
- [React Best Practices](https://react.dev)

## Maintenance Notes

**Last Major Refactor:** Structured data page (676 → 124 lines, 82% reduction)

**Code Health:**
- ✅ TypeScript strict mode enabled
- ✅ SOLID principles applied throughout
- ✅ Component library well-organized
- ✅ Custom hooks for reusability
- ✅ Proper error boundaries
- ✅ Markdown rendering in chat

**Future Improvements:**
- Add unit tests (Vitest + React Testing Library)
- Implement E2E tests (Playwright)
- Add more schema types (contacts, events, products)
- Support multiple AI providers
- Add conversation history persistence
