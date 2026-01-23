// middleware/withAuth.ts
// ============================================================
// Reusable Auth Middleware for Next.js API Routes
// ============================================================

import type { VercelRequest, VercelResponse } from '@vercel/node';

const COOKIE_NAME = 'bbh_session';

interface AuthOptions {
  roles?: string[];  // Allowed roles (empty = any authenticated user)
}

// Helper: Get session from cookie
function getSession(req: VercelRequest) {
  const cookies = req.headers.cookie || '';
  const match = cookies.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  
  if (!match) return null;
  
  try {
    return JSON.parse(Buffer.from(match[1], 'base64').toString());
  } catch {
    return null;
  }
}

// Middleware HOC
type VercelApiHandler = (req: VercelRequest, res: VercelResponse) => Promise<unknown>;

export function withAuth(handler: VercelApiHandler, options: AuthOptions = {}) {
  return async (req: VercelRequest, res: VercelResponse) => {
    const session = getSession(req);
    
    // Check authentication
    if (!session) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    // Check expiration
    if (session.expires_at && Date.now() > session.expires_at) {
      return res.status(401).json({ error: 'Session expired' });
    }
    
    // Check roles
    if (options.roles && options.roles.length > 0) {
      if (!options.roles.includes(session.user.role)) {
        return res.status(403).json({ 
          error: 'Access denied',
          required_roles: options.roles
        });
      }
    }
    
    // Attach user to request for handler to use (augmenting the request object)
    Object.assign(req, {
      user: session.user,
      accessToken: session.access_token
    });
    
    return handler(req, res);
  };
}
