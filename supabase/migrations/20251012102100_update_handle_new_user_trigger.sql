-- Update the handle_new_user function to accept role and subscription_status from metadata
-- This allows admins to set these values when inviting a new user.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role, subscription_status)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    -- Coalesce to 'user' if role is not provided in metadata
    COALESCE((new.raw_user_meta_data->>'role')::public.user_role_enum, 'user'),
    -- Coalesce to 'free' if subscription_status is not provided
    COALESCE((new.raw_user_meta_data->>'subscription_status')::public.subscription_status_enum, 'free')
  );
  RETURN new;
END;
$$;
