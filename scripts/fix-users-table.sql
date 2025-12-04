-- Add missing columns to users table for authentication
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS password VARCHAR(255),
ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'user',
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;

-- Drop email_verified column if it exists (not needed for our auth system)
DROP COLUMN IF EXISTS email_verified;

-- Update existing users to have default values
UPDATE users 
SET role = COALESCE(role, 'user'), 
    is_active = COALESCE(is_active, TRUE) 
WHERE role IS NULL OR is_active IS NULL;
