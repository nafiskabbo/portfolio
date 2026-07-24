import { NextRequest, NextResponse } from 'next/server';

function acceptsMarkdown(request: NextRequest): boolean {
  const accept = request.headers.get('accept') ?? '';
  return accept.includes('text/markdown');
}

export function proxy(request: NextRequest) {
  if (!acceptsMarkdown(request)) {
    return NextResponse.next();
  }

  const pathname = request.nextUrl.pathname;
  const url = request.nextUrl.clone();
  url.pathname = '/api/markdown';
  url.searchParams.set('path', pathname);

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
