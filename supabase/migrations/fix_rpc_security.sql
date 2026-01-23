-- Secure the update_site_settings function to bypass RLS
-- This allows the function to update the site_settings table even if strict RLS is enabled for the user
-- We also fix the 'search_path' lint warning by explicitly setting it

CREATE OR REPLACE FUNCTION update_site_settings(
  p_id UUID,
  p_maintenance_mode BOOLEAN,
  p_maintenance_message TEXT,
  p_maintenance_title TEXT,
  p_maintenance_detail TEXT,
  p_maintenance_duration TEXT,
  p_site_name TEXT,
  p_site_tagline TEXT,
  p_contact_email TEXT,
  p_google_analytics_id TEXT,
  p_available_for_work BOOLEAN,
  p_social_linkedin TEXT,
  p_social_line TEXT
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER -- Run as function owner (postgres) to bypass RLS
SET search_path = public -- Set search_path to preventing search_path hijacking
AS $$
DECLARE
  v_updated_data site_settings%ROWTYPE;
BEGIN
  -- Check if basic privileges exist (optional but good context)
  -- Since we use SECURITY DEFINER, RLS is bypassed, so we rely on the App logic to call this only for Admins.
  
  INSERT INTO site_settings (
    id,
    maintenance_mode,
    maintenance_message,
    maintenance_title,
    maintenance_detail,
    maintenance_duration,
    site_name,
    site_tagline,
    contact_email,
    google_analytics_id,
    available_for_work,
    social_linkedin,
    social_line,
    updated_at
  )
  VALUES (
    p_id,
    p_maintenance_mode,
    p_maintenance_message,
    p_maintenance_title,
    p_maintenance_detail,
    p_maintenance_duration,
    p_site_name,
    p_site_tagline,
    p_contact_email,
    p_google_analytics_id,
    p_available_for_work,
    p_social_linkedin,
    p_social_line,
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    maintenance_mode = EXCLUDED.maintenance_mode,
    maintenance_message = EXCLUDED.maintenance_message,
    maintenance_title = EXCLUDED.maintenance_title,
    maintenance_detail = EXCLUDED.maintenance_detail,
    maintenance_duration = EXCLUDED.maintenance_duration,
    site_name = EXCLUDED.site_name,
    site_tagline = EXCLUDED.site_tagline,
    contact_email = EXCLUDED.contact_email,
    google_analytics_id = EXCLUDED.google_analytics_id,
    available_for_work = EXCLUDED.available_for_work,
    social_linkedin = EXCLUDED.social_linkedin,
    social_line = EXCLUDED.social_line,
    updated_at = NOW()
  RETURNING * INTO v_updated_data;
  
  RETURN to_jsonb(v_updated_data);
END;
$$;
