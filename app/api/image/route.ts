import { NextRequest, NextResponse } from 'next/server';

const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

// Simple hash function for consistent colors
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  // Check if API key is configured
  if (!PEXELS_API_KEY || PEXELS_API_KEY === 'YOUR_PEXELS_API_KEY_HERE') {
    console.warn('Pexels API key not configured, using placeholder image');
    // Fallback to square placeholder if API key not set
    const imageUrl = `https://placehold.co/600x600/4facfe/white?text=${encodeURIComponent(query.slice(0, 30))}`;
    return NextResponse.json({ imageUrl });
  }

  try {
    // Call Pexels API with square orientation for album covers and consistent imagery
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=square`,
      {
        headers: {
          'Authorization': PEXELS_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.photos && data.photos.length > 0) {
      // Use medium size for square images (around 350x350)
      const imageUrl = data.photos[0].src.medium;
      console.log('Pexels image fetched:', imageUrl);
      return NextResponse.json({ imageUrl });
    } else {
      // No results, use placeholder
      throw new Error('No images found');
    }
  } catch (error) {
    console.error('Pexels API error:', error);
    // Fallback to square placeholder on error with colorful design
    const seed = hashString(query);
    const colors = [
      { bg: '667eea', text: 'white' }, // Purple
      { bg: 'f093fb', text: 'white' }, // Pink  
      { bg: '4facfe', text: 'white' }, // Blue
      { bg: '43e97b', text: 'white' }, // Green
      { bg: 'fa709a', text: 'white' }, // Orange
      { bg: 'a8edea', text: 'black' }, // Teal
    ];
    
    const colorScheme = colors[seed % colors.length];
    const displayText = query.slice(0, 30).replace(/\s+/g, '+');
    const imageUrl = `https://placehold.co/600x600/${colorScheme.bg}/${colorScheme.text}?text=${displayText}`;
    return NextResponse.json({ imageUrl });
  }
}
