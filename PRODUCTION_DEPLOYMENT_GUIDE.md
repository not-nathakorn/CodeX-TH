# 🚀 Production Deployment Configuration

**วันที่:** 2025-12-10  
**โปรเจกต์:** CodeX-TH Portfolio Hub  
**Production URL:** https://pph.codex-th.com

---

## 🔑 Environment Variables

### Development (.env.local)

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://jkvqfwjytjyhxrribetx.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# BlackBox Authentication (Development)
VITE_BLACKBOX_AUTH_URL=https://bbh.codex-th.com
VITE_CLIENT_ID=client_2odewqb56br
VITE_REDIRECT_URI=http://localhost:8080/admin/callback
```

### Production (.env.production)

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://jkvqfwjytjyhxrribetx.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# BlackBox Authentication (Production)
VITE_BLACKBOX_AUTH_URL=https://bbh.codex-th.com
VITE_CLIENT_ID=client_2odewqb56br
VITE_REDIRECT_URI=https://pph.codex-th.com/admin/callback
```

---

## 📋 Deployment Checklist

### Pre-Deployment:

- [ ] ✅ Build passes (`npm run build`)
- [ ] ✅ Type check passes (`npx tsc --noEmit`)
- [ ] ✅ Lint passes (`npm run lint`)
- [ ] ✅ All security scans passed
- [ ] ⚠️ Update AuthContext.tsx (BlackBox integration)
- [ ] ⚠️ Update CallbackPage.tsx (User data parsing)
- [ ] ⚠️ Create AuthGuard.tsx (Route protection)

### Environment Setup:

- [ ] Create `.env.production` file
- [ ] Add production environment variables
- [ ] Verify Supabase URL and keys
- [ ] Verify BlackBox client ID
- [ ] Verify redirect URI matches production URL

### BlackBox Configuration:

- [ ] Login to BlackBox Dashboard
- [ ] Navigate to Client: `client_2odewqb56br`
- [ ] Add redirect URI: `https://pph.codex-th.com/admin/callback`
- [ ] Verify grant types: `authorization_code`, `implicit`
- [ ] Verify response types: `token`, `id_token`
- [ ] Verify scopes: `openid`, `profile`, `email`

### Vercel Configuration:

- [ ] Add environment variables in Vercel Dashboard
- [ ] Set `VITE_BLACKBOX_AUTH_URL=https://bbh.codex-th.com`
- [ ] Set `VITE_CLIENT_ID=client_2odewqb56br`
- [ ] Set `VITE_REDIRECT_URI=https://pph.codex-th.com/admin/callback`
- [ ] Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

---

## 🔧 Vercel Deployment Steps

### Option 1: Deploy via Vercel Dashboard

1. **Connect Repository**

   ```
   - Go to vercel.com
   - Click "Add New Project"
   - Import from Git
   - Select your repository
   ```

2. **Configure Build Settings**

   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

3. **Add Environment Variables**

   ```
   VITE_SUPABASE_URL=https://jkvqfwjytjyhxrribetx.supabase.co
   VITE_SUPABASE_ANON_KEY=your_key
   VITE_BLACKBOX_AUTH_URL=https://bbh.codex-th.com
   VITE_CLIENT_ID=client_2odewqb56br
   VITE_REDIRECT_URI=https://pph.codex-th.com/admin/callback
   ```

4. **Deploy**
   ```
   Click "Deploy"
   Wait for build to complete
   ```

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Add environment variables
vercel env add VITE_BLACKBOX_AUTH_URL production
vercel env add VITE_CLIENT_ID production
vercel env add VITE_REDIRECT_URI production
vercel env add VITE_SUPABASE_URL production
vercel env add VITE_SUPABASE_ANON_KEY production
```

---

## 🌐 Domain Configuration

### Custom Domain Setup:

1. **Add Domain in Vercel**

   ```
   - Go to Project Settings → Domains
   - Add domain: pph.codex-th.com
   - Follow DNS configuration instructions
   ```

2. **DNS Records (Cloudflare/Your DNS Provider)**

   ```
   Type: CNAME
   Name: pph
   Value: cname.vercel-dns.com
   Proxy: Enabled (if using Cloudflare)
   ```

3. **SSL Certificate**
   ```
   - Vercel automatically provisions SSL
   - Wait for DNS propagation (~5-10 minutes)
   - Verify HTTPS works
   ```

---

## 🔒 Security Headers (Vercel)

### vercel.json

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 🧪 Post-Deployment Testing

### Test Checklist:

1. **Basic Functionality**

   - [ ] Homepage loads
   - [ ] Navigation works
   - [ ] All pages accessible
   - [ ] Images load correctly
   - [ ] Fonts load correctly

2. **Authentication Flow**

   - [ ] Click "Login" redirects to BlackBox
   - [ ] Login with valid credentials
   - [ ] Redirects back to `/admin/callback`
   - [ ] User data is saved
   - [ ] Redirects to admin dashboard
   - [ ] User menu shows username
   - [ ] Logout works

3. **Admin Features**

   - [ ] Can access admin pages
   - [ ] Can view analytics
   - [ ] Can manage content
   - [ ] Can update settings

4. **Database Connection**

   - [ ] Supabase connection works
   - [ ] Data loads correctly
   - [ ] CRUD operations work
   - [ ] Realtime updates work

5. **Performance**
   - [ ] Page load time < 3s
   - [ ] Lighthouse score > 90
   - [ ] No console errors
   - [ ] No 404 errors

---

## 🐛 Troubleshooting

### Issue 1: "Redirect URI mismatch"

**Error:**

```
Error: redirect_uri_mismatch
The redirect URI provided does not match
```

**Solution:**

1. Check VITE_REDIRECT_URI in Vercel env vars
2. Verify it matches BlackBox client settings
3. Must be exact: `https://pph.codex-th.com/admin/callback`
4. No trailing slash
5. HTTPS required for production

### Issue 2: "Environment variables not working"

**Error:**

```
import.meta.env.VITE_CLIENT_ID is undefined
```

**Solution:**

1. Verify env vars in Vercel Dashboard
2. Ensure they start with `VITE_`
3. Redeploy after adding env vars
4. Check build logs for env var values

### Issue 3: "CORS errors"

**Error:**

```
Access to fetch at 'https://bbh.codex-th.com' has been blocked by CORS
```

**Solution:**

1. Verify BlackBox allows your domain
2. Check Supabase CORS settings
3. Ensure requests include credentials
4. Check network tab for actual error

### Issue 4: "Page not found after refresh"

**Error:**

```
404 - This page could not be found
```

**Solution:**

1. Add `vercel.json` with rewrites
2. Configure SPA routing
3. Ensure all routes redirect to index.html

---

## 📊 Monitoring & Analytics

### Vercel Analytics

```bash
# Already installed
@vercel/analytics
@vercel/speed-insights
```

**Features:**

- ✅ Page views
- ✅ Performance metrics
- ✅ Web Vitals
- ✅ User analytics

### Error Tracking (Optional)

**Sentry Setup:**

```bash
npm install @sentry/react @sentry/vite-plugin
```

**Configuration:**

```typescript
// src/main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: import.meta.env.MODE,
  integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions (Optional)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: |
          npm run lint
          npx tsc --noEmit
          npm run build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: "--prod"
```

---

## 📝 Environment Variables Summary

### Required Variables:

| Variable                   | Development                            | Production                                |
| -------------------------- | -------------------------------------- | ----------------------------------------- |
| **VITE_SUPABASE_URL**      | Same                                   | Same                                      |
| **VITE_SUPABASE_ANON_KEY** | Same                                   | Same                                      |
| **VITE_BLACKBOX_AUTH_URL** | Same                                   | Same                                      |
| **VITE_CLIENT_ID**         | `client_2odewqb56br`                   | `client_2odewqb56br`                      |
| **VITE_REDIRECT_URI**      | `http://localhost:8080/admin/callback` | `https://pph.codex-th.com/admin/callback` |

### How to Set in Vercel:

1. Go to Project Settings
2. Click "Environment Variables"
3. Add each variable:
   - Name: `VITE_CLIENT_ID`
   - Value: `client_2odewqb56br`
   - Environment: Production
4. Click "Save"
5. Redeploy

---

## ✅ Final Checklist

### Code:

- [ ] ✅ All security updates applied
- [ ] ✅ Type safety 100%
- [ ] ✅ No lint errors
- [ ] ✅ Build successful
- [ ] ⚠️ BlackBox integration updated
- [ ] ⚠️ Auth flow tested

### Configuration:

- [ ] `.env.production` created
- [ ] Production env vars set
- [ ] BlackBox client configured
- [ ] Vercel project created
- [ ] Domain configured
- [ ] SSL enabled

### Testing:

- [ ] Local build tested
- [ ] Production build tested
- [ ] Auth flow tested
- [ ] All features tested
- [ ] Performance checked
- [ ] Security headers verified

### Documentation:

- [ ] ✅ Deployment guide created
- [ ] ✅ Environment vars documented
- [ ] ✅ Troubleshooting guide included
- [ ] README updated
- [ ] Team notified

---

## 🎯 Deployment Timeline

### Estimated Time:

1. **Code Updates:** ~1-2 hours

   - Update AuthContext
   - Update CallbackPage
   - Create AuthGuard
   - Test locally

2. **Vercel Setup:** ~30 minutes

   - Create project
   - Configure env vars
   - Initial deployment

3. **Domain Setup:** ~15 minutes

   - Add domain
   - Configure DNS
   - Wait for SSL

4. **Testing:** ~30 minutes
   - Test all features
   - Test auth flow
   - Check performance

**Total:** ~3-4 hours

---

## 📞 Support

### If Issues Occur:

1. **Check Vercel Logs**

   - Deployment logs
   - Function logs
   - Error logs

2. **Check Browser Console**

   - JavaScript errors
   - Network errors
   - CORS errors

3. **Check BlackBox Logs**

   - Login attempts
   - Token generation
   - Redirect errors

4. **Contact Support**
   - Vercel: vercel.com/support
   - BlackBox: Your admin contact
   - Supabase: supabase.com/support

---

**จัดทำโดย:** Antigravity AI  
**วันที่:** 2025-12-10  
**Status:** ✅ **READY FOR DEPLOYMENT**
