// middleware.js (at the root of your project)
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    // Match all routes except for static files and Next.js internals
    '/((?!.+\\.[\\w]+$|_next).*)',  // excludes static assets like .js, .css, .png
    '/',                            // include the homepage
    '/api/:path*',                  // include all API routes
  ],
};
