import { NextResponse } from 'next/server';
import { getAashBotResponse } from '@/utils/daemonAi';

const AASHBOT_BRAIN_URL = process.env.AASHBOT_BRAIN_URL || 'http://localhost:8000';

export async function POST(request) {
  try {
    const { query, contactFormState } = await request.json();
    
    if (!query) {
      return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    // 1. If in the middle of a conversational contact form session, process locally.
    // Deterministic state collection is handled locally to prevent neural networks from hallucinating inputs.
    if (contactFormState && contactFormState.step) {
      console.log("[AashBot Next.js Proxy] Processing contact flow step locally.");
      const fallbackReply = getAashBotResponse(query, contactFormState);
      return NextResponse.json(fallbackReply, { status: 200 });
    }

    // 2. Query the custom Scikit-learn FastAPI Python service
    try {
      console.log(`[AashBot Next.js Proxy] Querying Python FastAPI at ${AASHBOT_BRAIN_URL}/api/predict`);
      const res = await fetch(`${AASHBOT_BRAIN_URL}/api/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
        // Avoid hanging on API proxy calls
        signal: AbortSignal.timeout(4000)
      });

      if (res.ok) {
        const reply = await res.json();
        return NextResponse.json(reply, { status: 200 });
      } else {
        throw new Error(`FastAPI returned status ${res.status}`);
      }
    } catch (apiError) {
      // 3. Graceful fallback to local regex NLP parser on connection/server error
      console.warn("[AashBot Next.js Proxy] FastAPI request failed, falling back to local NLP engine.", apiError);
      const fallbackReply = getAashBotResponse(query, contactFormState);
      return NextResponse.json({
        ...fallbackReply,
        text: fallbackReply.text + "\n\n*(Note: Running in local backup mode)*"
      }, { status: 200 });
    }

  } catch (error) {
    console.error('[AashBot Next.js Proxy] Top-level error:', error);
    return NextResponse.json({
      text: "I encountered a server-side error. Please try again.",
      speakText: "I encountered a server-side error. Please try again.",
      suggestions: ["skills", "projects"]
    }, { status: 500 });
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
