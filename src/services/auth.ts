import { supabase } from '@/lib/supabase/client'
import type {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from '@supabase/supabase-js'

interface CustomSignUpCredentials extends SignUpWithPasswordCredentials {
  options?: {
    data?: {
      [key: string]: any
      name?: string
    }
  }
}

export const signUp = async (credentials: CustomSignUpCredentials) => {
  const { data, error } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
    options: {
      data: {
        full_name: credentials.options?.data?.name,
      },
    },
  })

  if (error) {
    throw error
  }
  return data
}

export const signIn = async (credentials: SignInWithPasswordCredentials) => {
  const { data, error } = await supabase.auth.signInWithPassword(credentials)

  if (error) {
    throw error
  }
  return data
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw error
  }
}
