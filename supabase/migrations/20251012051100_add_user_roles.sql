-- Create a custom enum type for user roles
CREATE TYPE public.user_role_enum AS ENUM ('user', 'admin');

-- Add the role column to the profiles table
ALTER TABLE public.profiles
ADD COLUMN role public.user_role_enum DEFAULT 'user' NOT NULL;

-- Add a comment to the new column
COMMENT ON COLUMN public.profiles.role IS 'Specifies the role of the user.';
