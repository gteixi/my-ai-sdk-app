import { FormEvent, ChangeEvent } from 'react';

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export function ChatInput({ input, isLoading, onInputChange, onSubmit }: ChatInputProps) {
  return (
    <form onSubmit={onSubmit} className="flex items-center gap-2">
      <div className="flex-1 bg-white border border-gray-300 rounded-full px-4 py-2 flex items-center">
        <input
          type="text"
          value={input}
          onChange={onInputChange}
          placeholder="iMessage"
          className="flex-1 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none text-[15px]"
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        disabled={!input.trim() || isLoading}
        className="w-8 h-8 rounded-full bg-[#007AFF] disabled:bg-gray-300 flex items-center justify-center transition-colors"
      >
        <svg 
          className="w-4 h-4 text-white" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
      </button>
    </form>
  );
}
