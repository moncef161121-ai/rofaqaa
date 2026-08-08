// API route handlers for backend operations

export const dynamic = 'force-dynamic'

// Health check endpoint
export async function GET(request: Request) {
  return new Response(
    JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  )
}
