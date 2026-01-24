-- Add long description columns to experience table
ALTER TABLE experience 
ADD COLUMN IF NOT EXISTS description_long_th TEXT,
ADD COLUMN IF NOT EXISTS description_long_en TEXT;

-- Bucket for uploads is usually checked via policies, we assume 'public' or 'images' bucket exists.
-- If not, creating a bucket via SQL is not standard, we usually do it via Storage API or Dashboard.
-- But we can add policy for storage objects if needed.
-- For now, let's just update the schema for long descriptions.
