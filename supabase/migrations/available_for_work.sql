-- Add available_for_work column to site_settings
ALTER TABLE site_settings 
ADD COLUMN IF NOT EXISTS available_for_work BOOLEAN DEFAULT true;

-- Update the update_site_settings RPC function to include this new column
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
  p_available_for_work BOOLEAN  -- New parameter
)
RETURNS jsonb AS $$
DECLARE
  v_updated_data site_settings%ROWTYPE;
BEGIN
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
    updated_at = NOW()
  RETURNING * INTO v_updated_data;
  
  RETURN to_jsonb(v_updated_data);
END;
$$ LANGUAGE plpgsql;
