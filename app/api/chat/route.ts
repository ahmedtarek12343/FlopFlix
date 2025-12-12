// /app/api/chat/route.ts

import { chat, toStreamResponse } from "@tanstack/ai";
import { createGemini } from "@tanstack/ai-gemini";

export async function POST(request: Request) {
  if (!process.env.GEMINI_API_KEY) {
    return new Response("Missing GEMINI_API_KEY", { status: 500 });
  }

  const { messages, conversationId } = await request.json();

  const adapter = createGemini(process.env.GEMINI_API_KEY);

  try {
    const systemPrompt = `You are a movie and TV show expert. Format your response as follows:
    1. Provide a helpful, engaging text answer.
    2. If you recommend specific movies or TV shows, ALWAYS include a valid JSON block at the very end of your response.
    3. The JSON block must look like this:
    {
      "recommendations": [
        { "query": "John Wick", "type": "movie" },
        { "query": "The Mandalorian", "type": "tv" }
      ]
    }
    4. Do not include any text after the JSON block.`;

    const stream = chat({
      adapter,
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      model: "gemini-2.5-flash",
      conversationId,
    });

    // Convert stream to HTTP response
    return toStreamResponse(stream);
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "An error occurred",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
