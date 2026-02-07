'use client';

import Link from 'next/link';
import { DiagramStreamText } from '@/components/landing/DiagramStreamText';
import { DiagramTools } from '@/components/landing/DiagramTools';
import { DiagramObject } from '@/components/landing/DiagramObject';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="mb-20">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            AI SDK Study Notes
          </h1>
          <p className="text-lg text-gray-600 mb-1">
            Three core patterns for building AI applications
          </p>
          <p className="text-base text-gray-500">
            Built with Vercel AI SDK 6 and Google Gemini
          </p>
        </div>

        {/* Section 1: Text Generation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            1. Text Generation
          </h2>
          <p className="text-base text-gray-700 leading-relaxed mb-6">
            Stream AI responses in real-time, token by token. The AI generates text as it "thinks", 
            perfect for building chat interfaces.
          </p>
          <DiagramStreamText />
          <div className="mt-6">
            <Link 
              href="/chat" 
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Try Chat Demo →
            </Link>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-gray-200 mb-16" />

        {/* Section 2: Tool Calling */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            2. Tool Calling
          </h2>
          <p className="text-base text-gray-700 leading-relaxed mb-6">
            Let AI call functions and use external APIs. The model decides when to use tools 
            like weather lookup, calculator, or time zones based on user input.
          </p>
          <DiagramTools />
          <div className="mt-6">
            <Link 
              href="/tools" 
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Try Tools Demo →
            </Link>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-gray-200 mb-16" />

        {/* Section 3: Structured Data */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            3. Structured Data
          </h2>
          <p className="text-base text-gray-700 leading-relaxed mb-6">
            Extract typed JSON objects from natural language. Define a Zod schema and get back 
            structured data that matches your types.
          </p>
          <DiagramObject />
          <div className="mt-6">
            <Link 
              href="/structured" 
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Try Structured Data Demo →
            </Link>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-gray-200 mb-12" />

        {/* Resources Footer */}
        <footer className="text-sm text-gray-600">
          <div>
            <span className="text-gray-900">Resources</span>{' '}
            <a
              href="https://ai-sdk.dev/docs/introduction"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              https://ai-sdk.dev/docs/introduction
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
