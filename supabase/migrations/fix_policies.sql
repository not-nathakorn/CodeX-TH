-- ===============================================================
-- Fix: Force Policy Drop and Recreate
-- ===============================================================

-- 1. Drop EVERYTHING related to site_settings policies to start clean
DROP POLICY IF EXISTS "Authenticated users can update site_settings" ON site_settings;
DROP POLICY IF EXISTS "Allow public update site_settings" ON site_settings;
DROP POLICY IF EXISTS "Allow public insert site_settings" ON site_settings;
DROP POLICY IF EXISTS "Allow public all site_settings" ON site_settings;
DROP POLICY IF EXISTS "Public read site_settings" ON site_settings;
DROP POLICY IF EXISTS "Anyone can read site_settings" ON site_settings;

-- 2. Create ONLY the read policy (Public)
-- WE DO NOT NEED UPDATE/INSERT POLICY because we are using SECURITY DEFINER function
CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT USING (true);
