-- Create a custom enum type for user roles
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role_enum') THEN
        CREATE TYPE public.user_role_enum AS ENUM ('user', 'admin');
    END IF;
END$$;

-- Add the role column to the profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS role public.user_role_enum DEFAULT 'user' NOT NULL;

-- Add a comment to the new column
COMMENT ON COLUMN public.profiles.role IS 'Specifies the role of the user.';
