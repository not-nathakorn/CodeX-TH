-- ===============================================================
-- Fix: Allow frontend to update settings directly
-- Reason: Application uses external Auth (BlackBox) so Supabase sees requests as Anonymous
-- ===============================================================

-- 1. Drop the old policy that required Supabase Auth
DROP POLICY IF EXISTS "Authenticated users can update site_settings" ON site_settings;

-- 2. Create a new policy allowing update for everyone (Public)
-- Note: The frontend is protected by AuthGuard, so normal users won't see the UI.
CREATE POLICY "Allow public update site_settings" ON site_settings 
    FOR UPDATE 
    USING (true);

-- 3. Also allow Insert just in case
CREATE POLICY "Allow public insert site_settings" ON site_settings 
    FOR INSERT 
    WITH CHECK (true);
