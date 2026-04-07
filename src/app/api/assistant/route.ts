import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || 'mock-key' });

export async function POST(req: NextRequest) {
  try {
    const { prompt, context } = await req.json();

    // Context from the app (e.g. current location, match status)
    const systemInstruction = `
      You are a Smart Venue Assistant for a large sports stadium.
      Your goal is to help attendees navigate efficiently, reduce wait times, and improve their experience.
      Current Context:
      - Location: ${context?.location || 'Unknown'}
      - Current Event Status: ${context?.eventStatus || 'Match in progress'}
      - Nearest Facilities Wait Times: Restrooms (3 mins), Concessions (12 mins - Busy).
      
      Provide helpful, brief, and practical advice based on this context. 
      Recommend the quickest routes or best times to visit stands.
    `;

    // If there's no actual API key, we mock a response for the challenge demonstration
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'mock-key') {
      return NextResponse.json({
        response: `(Mock Mode) Based on your prompt "${prompt}", and knowing you're at ${context?.location || 'your seat'}, I recommend waiting 5 minutes for the concession stand as lines are currently peaking. Restrooms in Section 104 are wide open.`,
        mocked: true,
      });
    }

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
    });

    return NextResponse.json({ response: response.text });
  } catch (error) {
    console.error('Error in assistant API:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
