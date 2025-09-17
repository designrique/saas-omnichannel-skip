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
  const { email, password } = credentials
  const name = credentials.options?.data?.name

  const signUpCredentials: SignUpWithPasswordCredentials = { email, password }

  if (name) {
    signUpCredentials.options = {
      data: {
        full_name: name,
      },
    }
  }

  const { data, error } = await supabase.auth.signUp(signUpCredentials)

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

export const resetPasswordForEmail = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/update-password`,
  })

  if (error) {
    throw error
  }
}
