// @ts-nocheck
'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useEffect, useRef, FormEvent, ChangeEvent } from 'react';
import {
  ChatMessages,
  ChatInput,
  ChatMessage,
  LoadingIndicator,
  ToolCallDisplay,
} from '@/components/chat';

const examplePrompts = [
  "What's the weather like in London?",
  "Calculate 15 * 23 + 47",
  "What time is it in Tokyo?",
  "Get the weather in Paris and calculate the temperature in Fahrenheit if it's 20°C",
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

export default function ToolsPage() {
  const [displayError, setDisplayError] = useState<string | null>(null);
  
  const chatResult = useChat({
    api: '/api/tools',
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

  // Set initial greeting
  useEffect(() => {
    if (!greetingSet && messages.length === 0) {
      setMessages([
        {
          id: 'greeting-initial',
          role: 'assistant',
          parts: [{ 
            type: 'text', 
            text: "Hi! I'm your AI assistant with tool-calling capabilities. I can:\n\n🌤️ Check weather for any location\n🔢 Perform calculations\n🕐 Tell you the time anywhere\n\nTry asking me something!" 
          }],
        } as any
      ]);
      setGreetingSet(true);
    }
  }, [greetingSet, messages.length, setMessages]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, displayError]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    setDisplayError(null);
    sendMessage({ text: input });
    setInput('');
  };

  const handleExampleClick = (prompt: string) => {
    if (isLoading) return;
    setDisplayError(null);
    sendMessage({ text: prompt });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-white">
      {/* Header - Always Visible */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-b border-gray-200 px-4 py-3">
        <h1 className="text-lg font-semibold text-gray-900">Tool Calling Demo</h1>
        <p className="text-sm text-gray-600 mt-1">
          Watch the AI automatically call functions to answer your questions
        </p>
      </div>

      {/* Example Prompts - Always Visible */}
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-3">
        <p className="text-xs font-medium text-gray-600 mb-2">Try these examples:</p>
        <div className="flex flex-wrap gap-2">
          {examplePrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleExampleClick(prompt)}
              disabled={isLoading}
              className="text-xs px-3 py-1.5 bg-white border border-gray-300 rounded-full hover:bg-gray-100 hover:border-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto bg-white px-4 py-4">
        <div className="space-y-1">
          {messages.map((message) => {
            // Check if message has tool invocations
            const hasTools = message.parts?.some((part: any) => part.type === 'tool-call');
            
            if (hasTools) {
              // Render tool calls and results
              return (
                <div key={message.id}>
                  {message.parts?.map((part: any, idx: number) => {
                    if (part.type === 'tool-call') {
                      // Find the corresponding result
                      const resultPart = message.parts?.find(
                        (p: any) => p.type === 'tool-result' && p.toolCallId === part.toolCallId
                      );
                      
                      return (
                        <ToolCallDisplay
                          key={`${message.id}-tool-${idx}`}
                          toolInvocation={{
                            toolCallId: part.toolCallId,
                            toolName: part.toolName,
                            args: part.args,
                            result: resultPart?.result,
                            state: resultPart ? 'result' : 'call',
                          }}
                        />
                      );
                    }
                    return null;
                  })}
                  
                  {/* Show text response after tools */}
                  {message.parts?.some((p: any) => p.type === 'text') && (
                    <ChatMessage message={message} />
                  )}
                </div>
              );
            }
            
            // Regular message without tools
            return <ChatMessage key={message.id} message={message} />;
          })}
          
          {isLoading && <LoadingIndicator />}
          
          {displayError && (
            <div className="flex justify-start mb-2">
              <div className="max-w-[85%] px-4 py-3 bg-red-100 text-red-900 rounded-[18px] border border-red-200">
                <div className="text-[15px] leading-[20px] whitespace-pre-wrap">
                  {displayError}
                </div>
              </div>
            </div>
          )}
        </div>
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
