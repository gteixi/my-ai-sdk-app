import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Convert UIMessage format to CoreMessage format
  const convertedMessages = messages.map((msg: any) => {
    // Extract text from parts array
    const textContent = msg.parts
      ?.filter((part: any) => part.type === 'text')
      .map((part: any) => part.text)
      .join('') || '';
    
    return {
      role: msg.role,
      content: textContent,
    };
  });

  const result = streamText({
    model: google('gemini-2.5-flash'),
    system: `You are a helpful AI assistant. Keep your responses concise and well-formatted. 
    Use markdown formatting:
    - Use bullet points for lists
    - Use **bold** for emphasis
    - Use headings (##) to organize longer responses
    - Keep paragraphs short and readable
    - Avoid overly long explanations unless specifically asked
    - Break down complex topics into digestible sections`,
    messages: convertedMessages,
  });

  return result.toUIMessageStreamResponse();
}
