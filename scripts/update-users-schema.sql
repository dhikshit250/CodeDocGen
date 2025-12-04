-- Add missing columns to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS password VARCHAR(255),
ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'user',
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;

-- Update existing users to have default values
UPDATE users 
SET role = 'user', is_active = TRUE 
WHERE role IS NULL OR is_active IS NULL;
