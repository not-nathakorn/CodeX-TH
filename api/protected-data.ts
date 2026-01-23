// api/protected-data.ts
// ============================================================
// Example: Protected API Route (Next.js/Vercel)
// ============================================================
// With BFF pattern, your API reads the HttpOnly Cookie
// that was set by /api/auth/proxy
// ============================================================

import type { VercelRequest, VercelResponse } from '@vercel/node';

const COOKIE_NAME = 'bbh_session';

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

// Main Handler
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Get session from HttpOnly cookie
  const session = getSession(req);
  
  if (!session) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  
  // 2. Check if session expired
  if (session.expires_at && Date.now() > session.expires_at) {
    return res.status(401).json({ error: 'Session expired' });
  }
  
  // 3. Access user data
  const user = session.user;
  
  // 4. (Optional) Role-based access control
  const allowedRoles = ['admin', 'teacher'];
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return res.status(403).json({ 
      error: 'Access denied',
      required_roles: allowedRoles,
      your_role: user.role
    });
  }
  
  // 5. Return protected data
  return res.status(200).json({
    success: true,
    message: 'You have access to protected data!',
    user: {
      id: user.id,
      email: user.email,
      name: user.first_name,
      role: user.role
    },
    data: {
      // Your protected data here
      secret: 'This is only visible to authenticated users'
    }
  });
}
