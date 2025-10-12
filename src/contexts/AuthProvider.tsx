import { createContext, useContext, useEffect, useState } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase/client'

export type Profile = {
  id: string
  full_name: string | null
  subscription_status: 'free' | 'pro' | 'inactive' | null
}

type AuthContextType = {
  session: Session | null
  user: User | null
  profile: Profile | null
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session)
      const currentUser = session?.user ?? null
      setUser(currentUser)

      if (currentUser) {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', currentUser.id)
          .single()

        if (profileData) {
          setProfile(profileData)
        } else if (profileError && profileError.code === 'PGRST116') {
          const { data: newProfile, error: insertError } = await supabase
            .from('profiles')
            .insert({
              id: currentUser.id,
              full_name: currentUser.user_metadata.full_name,
              subscription_status: 'free',
            })
            .select()
            .single()

          if (insertError) {
            console.error('Error creating profile:', insertError)
            setProfile(null)
          } else {
            setProfile(newProfile)
          }
        } else if (profileError) {
          console.error('Error fetching profile:', profileError)
          setProfile(null)
        }
      } else {
        setProfile(null)
      }
      setIsLoading(false)
    })

    return () => {
      authListener.unsubscribe()
    }
  }, [])

  const value = { session, user, profile, isLoading }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
