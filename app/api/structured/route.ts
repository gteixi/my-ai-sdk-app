import { google } from '@ai-sdk/google';
import { streamObject } from 'ai';
import { z } from 'zod';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Define multiple schemas for different use cases
const schemas = {
  recipe: z.object({
    name: z.string().describe('Name of the dish'),
    cuisine: z.string().describe('Type of cuisine (e.g., Italian, French, Asian)'),
    difficulty: z.enum(['easy', 'medium', 'hard']).describe('Cooking difficulty level'),
    prepTime: z.number().describe('Preparation time in minutes'),
    cookTime: z.number().describe('Cooking time in minutes'),
    servings: z.number().describe('Number of servings'),
    ingredients: z.array(z.object({
      item: z.string().describe('Ingredient name'),
      amount: z.string().describe('Amount needed (e.g., "2 cups", "1 tbsp")'),
    })).describe('List of ingredients'),
    instructions: z.array(z.string()).describe('Step-by-step cooking instructions'),
    tags: z.array(z.string()).optional().describe('Tags like "vegetarian", "gluten-free", "dessert"'),
    nutritionInfo: z.object({
      calories: z.number().optional(),
      protein: z.string().optional(),
      carbs: z.string().optional(),
    }).optional().describe('Nutritional information per serving'),
  }),

  album: z.object({
    title: z.string().describe('Album title'),
    artist: z.string().describe('Artist or band name'),
    releaseYear: z.number().describe('Year of release'),
    genre: z.string().describe('Music genre (e.g., Rock, Jazz, Classical, Hip-Hop)'),
    label: z.string().optional().describe('Record label'),
    tracks: z.array(z.object({
      number: z.number().describe('Track number'),
      title: z.string().describe('Song title'),
      duration: z.string().describe('Duration (e.g., "3:45")'),
      featuring: z.array(z.string()).optional().describe('Featured artists if any'),
    })).describe('List of tracks on the album'),
    producers: z.array(z.string()).optional().describe('Album producers'),
    awards: z.array(z.string()).optional().describe('Notable awards or certifications'),
    rating: z.number().min(0).max(5).optional().describe('Average rating (0-5)'),
  }),

  roadBike: z.object({
    model: z.string().describe('Bike model name'),
    brand: z.string().describe('Manufacturer brand'),
    year: z.number().describe('Model year'),
    category: z.enum(['racing', 'endurance', 'aero', 'gravel', 'touring']).describe('Bike category'),
    frame: z.object({
      material: z.enum(['carbon', 'aluminum', 'steel', 'titanium']).describe('Frame material'),
      weight: z.string().describe('Frame weight (e.g., "850g")'),
      geometry: z.string().optional().describe('Geometry type (e.g., "aggressive", "relaxed")'),
    }).describe('Frame specifications'),
    groupset: z.object({
      brand: z.string().describe('Groupset manufacturer (e.g., Shimano, SRAM, Campagnolo)'),
      model: z.string().describe('Groupset model (e.g., "Dura-Ace Di2", "Ultegra")'),
      speeds: z.number().describe('Number of gears (e.g., 11, 12)'),
      electronic: z.boolean().describe('Whether it has electronic shifting'),
    }).describe('Drivetrain groupset'),
    wheels: z.object({
      brand: z.string().optional(),
      rimDepth: z.string().optional().describe('Rim depth (e.g., "50mm")'),
      tubeless: z.boolean().optional(),
    }).optional().describe('Wheel specifications'),
    price: z.number().describe('Price in USD'),
    weight: z.string().describe('Total bike weight (e.g., "7.2kg")'),
    features: z.array(z.string()).describe('Key features and technologies'),
    tourDeFranceHistory: z.object({
      usedInTDF: z.boolean().describe('Whether used in Tour de France'),
      teams: z.array(z.string()).optional().describe('Teams that used this bike'),
      victories: z.array(z.string()).optional().describe('Notable TDF victories with this bike'),
    }).optional().describe('Tour de France history if applicable'),
  }),
};

export async function POST(req: Request) {
  const { prompt, schemaType } = await req.json();

  // Validate schema type
  if (!schemaType || !(schemaType in schemas)) {
    return new Response(
      JSON.stringify({ error: 'Invalid or missing schemaType' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const selectedSchema = schemas[schemaType as keyof typeof schemas];

  const result = streamObject({
    model: google('gemini-2.5-flash'),
    schema: selectedSchema,
    prompt: `Extract structured data from the following text. If information is missing, infer reasonable defaults when appropriate:\n\n${prompt}`,
    onError: (error) => {
      console.error('Stream error:', error);
    },
  });

  return result.toTextStreamResponse();
}
