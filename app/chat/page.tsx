'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useEffect, useRef, FormEvent, ChangeEvent } from 'react';
import {
  ChatMessages,
  ChatInput,
} from '@/components/chat';

const greetings = [
  "Hello! How can I help you today?",
  "Good day! What can I do for you?",
  "Hi! What's on your mind?",
  "Hey! Need help with something?",
  "Hello! How can I assist you today?",
];

// Helper function to parse retry time from error message
function parseRetryTime(errorMessage: string): string | null {
  const retryMatch = errorMessage.match(/retry in ([\d.]+)s/i);
  if (retryMatch) {
    const seconds = Math.ceil(parseFloat(retryMatch[1]));
    if (seconds < 60) {
      return `${seconds} seconds`;
    } else {
      const minutes = Math.ceil(seconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
  }
  return null;
}

export default function Chat() {
  const [displayError, setDisplayError] = useState<string | null>(null);
  
  const chatResult = useChat({
    onError: (error) => {
      const errorMessage = error.message || error.toString() || 'An unexpected error occurred';
      const lowerMessage = errorMessage.toLowerCase();
      const retryTime = parseRetryTime(errorMessage);
      
      // Check for specific error types
      if (lowerMessage.includes('quota') || 
          lowerMessage.includes('rate limit') || 
          lowerMessage.includes('resource_exhausted') ||
          lowerMessage.includes('429')) {
        const displayRetryTime = retryTime || '5 minutes';
        setDisplayError(`⚠️ API Limit Exceeded\n\nYou've exceeded your free API quota limit.\n\n⏱️ Try again in: ${displayRetryTime}\n\n💡 What you can do:\n• Wait ${displayRetryTime} before trying again\n• The free tier has limited requests per minute\n• Check usage at: https://ai.dev/rate-limit\n• Learn more: https://ai.google.dev/gemini-api/docs/rate-limits`);
      } else if (lowerMessage.includes('api key') && 
                 (lowerMessage.includes('expired') || lowerMessage.includes('invalid'))) {
        setDisplayError("⚠️ API Key Issue\n\nYour API key appears to be expired or invalid.\n\n💡 Solutions:\n• Create a NEW Google Cloud project (not just a new key)\n• Generate a fresh API key from that new project\n• Update your .env.local file\n• Restart the dev server\n\nGet a new key at: https://aistudio.google.com/apikey");
      } else {
        setDisplayError(`⚠️ Error\n\n${errorMessage}\n\nPlease try again in a moment.`);
      }
    }
  });
  const { messages, sendMessage, status, error, setMessages } = chatResult;
  
  const [input, setInput] = useState('');
  const [greetingSet, setGreetingSet] = useState(false);
  const isLoading = status === 'submitted' || status === 'streaming';
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Set initial greeting only on client side to avoid hydration mismatch
  useEffect(() => {
    if (!greetingSet && messages.length === 0) {
      const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
      setMessages([
        {
          id: 'greeting-initial',
          role: 'assistant',
          parts: [{ type: 'text', text: randomGreeting }],
        } as any
      ]);
      setGreetingSet(true);
    }
  }, [greetingSet, messages.length, setMessages]);

  // Auto-scroll to bottom when new messages arrive or error changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, displayError]);

  // Handle error - persist it until user sends a new message
  useEffect(() => {
    if (error) {
      const errorMessage = error.message || error.toString() || '';
      const retryTime = parseRetryTime(errorMessage);
      
      // Check if it's a quota/rate limit error
      if (errorMessage.toLowerCase().includes('quota') || 
          errorMessage.toLowerCase().includes('rate limit') || 
          errorMessage.toLowerCase().includes('resource_exhausted')) {
        const displayRetryTime = retryTime || '5 minutes';
        setDisplayError(`⚠️ API Limit Exceeded\n\nYou've exceeded your free API quota limit.\n\n⏱️ Try again in: ${displayRetryTime}\n\n💡 What you can do:\n• Wait ${displayRetryTime} before trying again\n• The free tier has limited requests per minute\n• Check usage at: https://ai.dev/rate-limit\n• Learn more: https://ai.google.dev/gemini-api/docs/rate-limits`);
      } else {
        setDisplayError(`⚠️ Error\n\n${errorMessage}\n\nPlease try again in a moment.`);
      }
    }
  }, [error]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    // Clear error when user sends a new message
    setDisplayError(null);
    
    sendMessage({ text: input });
    setInput('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-white">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto bg-white px-4 py-4">
        <ChatMessages 
          messages={messages} 
          isLoading={isLoading}
          errorMessage={displayError}
        />
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-[#f6f6f6] border-t border-gray-200 px-4 py-2">
        <ChatInput
          input={input}
          isLoading={isLoading}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
