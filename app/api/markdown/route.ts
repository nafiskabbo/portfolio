import { getMarkdownForPath } from '@/lib/markdown/pages';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path') ?? '/';

  const result = getMarkdownForPath(path);
  if (!result) {
    return new Response('# Not Found\n\nNo markdown representation for this path.', {
      status: 404,
      headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
    });
  }

  return new Response(result.body, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'x-markdown-tokens': String(result.tokens),
      'Cache-Control': 'public, max-age=300, s-maxage=3600',
    },
  });
}
