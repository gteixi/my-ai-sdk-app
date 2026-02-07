import type { Message } from '@/types/chat';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  // Extract text from parts array
  const textContent = message.parts
    ?.filter((part: any) => part.type === 'text')
    .map((part: any) => part.text)
    .join('') || '';
  
  return (
    <div className={`flex mb-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[75%] px-4 py-2.5 ${
          isUser
            ? 'bg-[#007AFF] text-white rounded-[18px]'
            : 'bg-[#E9E9EB] text-black rounded-[18px]'
        }`}
      >
        <div className="text-[15px] leading-[20px]">
          {isUser ? (
            <div className="whitespace-pre-wrap">{textContent}</div>
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                // Customize markdown rendering for better formatting
                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                ul: ({ children }) => <ul className="list-disc ml-5 mb-2 space-y-1">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal ml-5 mb-2 space-y-1">{children}</ol>,
                li: ({ children }) => <li>{children}</li>,
                h1: ({ children }) => <h1 className="text-lg font-bold mb-2 mt-3 first:mt-0">{children}</h1>,
                h2: ({ children }) => <h2 className="text-base font-bold mb-2 mt-3 first:mt-0">{children}</h2>,
                h3: ({ children }) => <h3 className="text-[15px] font-bold mb-1 mt-2 first:mt-0">{children}</h3>,
                code: ({ inline, children, ...props }: any) => 
                  inline ? (
                    <code className="bg-black bg-opacity-10 px-1.5 py-0.5 rounded text-[14px] font-mono" {...props}>
                      {children}
                    </code>
                  ) : (
                    <code className="block bg-black bg-opacity-10 p-2 rounded text-[14px] font-mono my-2 overflow-x-auto" {...props}>
                      {children}
                    </code>
                  ),
                pre: ({ children }) => <pre className="my-2">{children}</pre>,
                strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                em: ({ children }) => <em className="italic">{children}</em>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-3 border-gray-500 pl-3 italic my-2 opacity-80">
                    {children}
                  </blockquote>
                ),
                hr: () => <hr className="my-3 border-gray-400" />,
                a: ({ children, href }) => (
                  <a href={href} className="text-blue-600 underline hover:text-blue-700" target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                ),
              }}
            >
              {textContent}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
}
