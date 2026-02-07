// @ts-nocheck
import { google } from '@ai-sdk/google';
import { streamText, tool } from 'ai';
import { z } from 'zod';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Define tools
  // @ts-ignore - tool type inference issue with AI SDK 6
  const tools = {
    getWeather: tool({
      description: 'Get current weather for a location. Use this when users ask about weather conditions, temperature, or forecast.',
      parameters: z.object({
        location: z.string().describe('City name or location to get weather for'),
      }),
      execute: (async ({ location }) => {
        try {
          // Using wttr.in free weather API (no key required!)
          const response = await fetch(`https://wttr.in/${encodeURIComponent(location)}?format=j1`);
          
          if (!response.ok) {
            return {
              location,
              error: 'Could not fetch weather data',
              temperature: 'Unknown',
              condition: 'Unknown',
            };
          }

          const data = await response.json();
          const current = data.current_condition[0];
          
          return {
            location,
            temperature: `${current.temp_C}°C (${current.temp_F}°F)`,
            condition: current.weatherDesc[0].value,
            humidity: `${current.humidity}%`,
            windSpeed: `${current.windspeedKmph} km/h`,
            feelsLike: `${current.FeelsLikeC}°C`,
          };
        } catch (error) {
          return {
            location,
            error: 'Weather service temporarily unavailable',
            temperature: 'Unknown',
            condition: 'Unknown',
          };
        }
      }) as any,
    }),

    calculate: tool({
      description: 'Perform mathematical calculations. Supports basic arithmetic (+, -, *, /) and common math operations.',
      parameters: z.object({
        expression: z.string().describe('Mathematical expression to evaluate (e.g., "2 + 2", "15 * 3.5")'),
      }),
      execute: (async ({ expression }) => {
        try {
          // Safe evaluation - only allow numbers and basic operators
          const sanitized = expression.replace(/[^0-9+\-*/(). ]/g, '');
          
          if (sanitized !== expression) {
            return {
              expression,
              error: 'Invalid characters in expression. Only numbers and +, -, *, /, (, ) are allowed.',
            };
          }

          // Use Function constructor for safe eval (no access to scope)
          const result = new Function(`'use strict'; return (${sanitized})`)();
          
          return {
            expression,
            result: Number(result),
            formatted: `${expression} = ${result}`,
          };
        } catch (error) {
          return {
            expression,
            error: 'Could not evaluate expression. Please check syntax.',
          };
        }
      }) as any,
    }),

    getCurrentTime: tool({
      description: 'Get the current date and time, optionally for a specific timezone. Use this when users ask about the time or date.',
      parameters: z.object({
        timezone: z.string().optional().describe('IANA timezone name (e.g., "America/New_York", "Europe/London", "Asia/Tokyo"). Leave empty for UTC.'),
      }),
      execute: (async ({ timezone }) => {
        try {
          const now = new Date();
          const options: Intl.DateTimeFormatOptions = {
            timeZone: timezone || 'UTC',
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short',
          };

          const formatted = now.toLocaleString('en-US', options);
          
          return {
            timezone: timezone || 'UTC',
            timestamp: now.toISOString(),
            formatted,
            unix: Math.floor(now.getTime() / 1000),
          };
        } catch (error) {
          return {
            timezone: timezone || 'UTC',
            error: 'Invalid timezone specified',
            formatted: new Date().toISOString(),
          };
        }
      }) as any,
    }),
  };

  const result = streamText({
    model: google('gemini-2.5-flash'),
    messages,
    tools,
    maxSteps: 5, // Allow multiple tool calls in sequence
  });

  return result.toUIMessageStreamResponse();
}
