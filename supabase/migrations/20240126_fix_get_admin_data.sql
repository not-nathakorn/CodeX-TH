-- Fix JSON aggregation with ORDER BY in get_admin_data
-- Previous version had ORDER BY outside json_agg which caused error 42803

CREATE OR REPLACE FUNCTION get_admin_data(p_table_name text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_catalog
AS $$
DECLARE
    result jsonb;
BEGIN
    -- Validation to prevent SQL Injection (allow-list)
    IF p_table_name NOT IN ('projects', 'education', 'experience', 'map_universities') THEN
        RAISE EXCEPTION 'Invalid table name';
    END IF;

    -- Dynamic Query with corrected ORDER BY placement
    -- The ORDER BY must be inside the aggregate function to sort the array elements
    EXECUTE format('SELECT json_agg(t ORDER BY t.order_index ASC) FROM %I t', p_table_name) INTO result;
    
    RETURN coalesce(result, '[]'::jsonb);
END;
$$;
