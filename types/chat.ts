import { UIMessage } from '@ai-sdk/react';

export type Message = UIMessage;

export interface ChatError {
  message: string;
  retryAfter?: number;
}

export interface ToolInvocation {
  toolCallId: string;
  toolName: string;
  args: any;
  result?: any;
  state: 'call' | 'result' | 'partial-call';
}
