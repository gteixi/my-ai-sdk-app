import type { Message } from '@/types/chat';
import { ChatMessage } from './ChatMessage';
import { LoadingIndicator } from './LoadingIndicator';

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  errorMessage?: string | null;
}

export function ChatMessages({ messages, isLoading, errorMessage }: ChatMessagesProps) {
  return (
    <div className="space-y-1">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
      {isLoading && <LoadingIndicator />}
      {errorMessage && (
        <div className="flex justify-start mb-2">
          <div className="max-w-[85%] px-4 py-3 bg-red-100 text-red-900 rounded-[18px] border border-red-200">
            <div className="text-[15px] leading-[20px] whitespace-pre-wrap">
              {errorMessage}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
