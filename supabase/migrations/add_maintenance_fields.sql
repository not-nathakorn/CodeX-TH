-- ===============================================================
-- Add Custom Maintenance Fields and Update RPC
-- ===============================================================

-- 1. Add new columns to site_settings table
ALTER TABLE site_settings 
ADD COLUMN IF NOT EXISTS maintenance_title VARCHAR(255) DEFAULT 'Under Maintenance',
ADD COLUMN IF NOT EXISTS maintenance_detail TEXT DEFAULT 'ขออภัยในความไม่สะดวก เรากำลังพัฒนาระบบเพื่อให้ดียิ่งขึ้น กรุณากลับมาใหม่ในภายหลัง',
ADD COLUMN IF NOT EXISTS maintenance_duration VARCHAR(100) DEFAULT 'A few hours';

-- 2. Update the RPC function to handle new fields
CREATE OR REPLACE FUNCTION update_site_settings(
    p_id UUID,
    p_maintenance_mode BOOLEAN,
    p_maintenance_message TEXT,
    p_site_name VARCHAR,
    p_site_tagline VARCHAR,
    p_contact_email VARCHAR,
    p_google_analytics_id VARCHAR,
    -- New params
    p_maintenance_title VARCHAR DEFAULT 'Under Maintenance',
    p_maintenance_detail TEXT DEFAULT 'ขออภัยในความไม่สะดวก เรากำลังพัฒนาระบบเพื่อให้ดียิ่งขึ้น กรุณากลับมาใหม่ในภายหลัง',
    p_maintenance_duration VARCHAR DEFAULT 'A few hours'
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_catalog
AS $$
DECLARE
    v_result JSONB;
BEGIN
    UPDATE site_settings
    SET 
        maintenance_mode = p_maintenance_mode,
        maintenance_message = p_maintenance_message,
        site_name = p_site_name,
        site_tagline = p_site_tagline,
        contact_email = p_contact_email,
        google_analytics_id = p_google_analytics_id,
        -- Update new fields
        maintenance_title = p_maintenance_title,
        maintenance_detail = p_maintenance_detail,
        maintenance_duration = p_maintenance_duration,
        updated_at = NOW()
    WHERE id = p_id
    RETURNING to_jsonb(site_settings.*) INTO v_result;

    -- Fallback Insert
    IF v_result IS NULL THEN
        INSERT INTO site_settings (
            id, maintenance_mode, maintenance_message, 
            site_name, site_tagline, contact_email, google_analytics_id,
            maintenance_title, maintenance_detail, maintenance_duration
        ) VALUES (
            p_id, p_maintenance_mode, p_maintenance_message,
            p_site_name, p_site_tagline, p_contact_email, p_google_analytics_id,
            p_maintenance_title, p_maintenance_detail, p_maintenance_duration
        )
        RETURNING to_jsonb(site_settings.*) INTO v_result;
    END IF;

    RETURN v_result;
END;
$$;
