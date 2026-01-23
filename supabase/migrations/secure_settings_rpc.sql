-- ===============================================================
-- Secure Settings Update via RPC
-- Reason: To allow updates from frontend without exposing unrestricted RLS
-- ===============================================================

-- 1. Create a secure function to update settings
CREATE OR REPLACE FUNCTION update_site_settings(
    p_id UUID,
    p_maintenance_mode BOOLEAN,
    p_maintenance_message TEXT,
    p_site_name VARCHAR,
    p_site_tagline VARCHAR,
    p_contact_email VARCHAR,
    p_google_analytics_id VARCHAR
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER -- Run as database owner (bypasses RLS)
SET search_path = public, pg_catalog
AS $$
DECLARE
    v_result JSONB;
BEGIN
    -- Update the record
    UPDATE site_settings
    SET 
        maintenance_mode = p_maintenance_mode,
        maintenance_message = p_maintenance_message,
        site_name = p_site_name,
        site_tagline = p_site_tagline,
        contact_email = p_contact_email,
        google_analytics_id = p_google_analytics_id,
        updated_at = NOW()
    WHERE id = p_id
    RETURNING to_jsonb(site_settings.*) INTO v_result;

    -- If no row found (should exclude this if Insert is needed, but we assume row exists)
    IF v_result IS NULL THEN
        -- Fallback: Insert if not exists (Upsert logic)
        INSERT INTO site_settings (
            id, maintenance_mode, maintenance_message, 
            site_name, site_tagline, contact_email, google_analytics_id
        ) VALUES (
            p_id, p_maintenance_mode, p_maintenance_message,
            p_site_name, p_site_tagline, p_contact_email, p_google_analytics_id
        )
        RETURNING to_jsonb(site_settings.*) INTO v_result;
    END IF;

    RETURN v_result;
END;
$$;

-- 2. Restrict RLS on the table itself (Read Only for Public)
DROP POLICY IF EXISTS "Allow public all site_settings" ON site_settings;
DROP POLICY IF EXISTS "Allow public update site_settings" ON site_settings;
DROP POLICY IF EXISTS "Allow public insert site_settings" ON site_settings;

-- Ensure RLS is enabled
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Allow Public Read
DROP POLICY IF EXISTS "Public read site_settings" ON site_settings;
CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT USING (true);

-- Deny Public Update/Insert (implicitly denied if no policy matches)
-- But we can be explicit if we want, or just leave SELECT only.
