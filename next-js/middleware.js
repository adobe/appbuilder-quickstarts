import { NextResponse } from 'next/server'

export function middleware(request) {
  // Store the response so we can modify its headers
  const response = NextResponse.next()

  if (request.nextUrl.pathname.startsWith('/use-middleware')) {
      // Set custom header
    response.headers.set('x-running-on', 'Adobe App Builder')
  }

  // Return response
  return response
}
