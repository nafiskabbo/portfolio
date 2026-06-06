export function GET() {
  return Response.json(
    { status: 'pass' },
    {
      status: 200,
      headers: {
        'Content-Type': 'application/health+json',
        'Cache-Control': 'no-cache',
      },
    }
  );
}
