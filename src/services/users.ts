import { supabase } from '@/lib/supabase/client'
import type { Database, Tables, Enums } from '@/lib/supabase/types'

export type UserProfile = Tables<'profiles'> & {
  email: string | null
}

export type UserRole = Enums<'user_role_enum'>
export type SubscriptionStatus = Enums<'subscription_status_enum'>

type GetUsersParams = {
  page: number
  perPage: number
  filters: {
    role?: UserRole
    subscription_status?: SubscriptionStatus
  }
}

export const getUsers = async ({
  page,
  perPage,
  filters,
}: GetUsersParams): Promise<{ users: UserProfile[]; count: number }> => {
  let query = supabase
    .from('profiles')
    .select('*, users(email)', { count: 'exact' })

  if (filters.role) {
    query = query.eq('role', filters.role)
  }
  if (filters.subscription_status) {
    query = query.eq('subscription_status', filters.subscription_status)
  }

  const from = (page - 1) * perPage
  const to = from + perPage - 1

  const { data, error, count } = await query
    .order('created_at', { ascending: false })
    .range(from, to)

  if (error) {
    console.error('Error fetching users:', error)
    throw error
  }

  const users = data.map((profile: any) => ({
    ...profile,
    email: profile.users?.email ?? null,
  }))

  return { users, count: count ?? 0 }
}

type CreateUserPayload = {
  email: string
  full_name: string
  role: UserRole
  subscription_status: SubscriptionStatus
}

export const createUser = async (payload: CreateUserPayload) => {
  const { error } = await supabase.functions.invoke('manage-users', {
    method: 'POST',
    body: payload,
  })

  if (error) throw error
}

type UpdateUserPayload = {
  userId: string
  updates: Partial<{
    full_name: string
    role: UserRole
    subscription_status: SubscriptionStatus
  }>
}

export const updateUser = async ({ userId, updates }: UpdateUserPayload) => {
  const { data, error } = await supabase.functions.invoke('manage-users', {
    method: 'PATCH',
    body: { userId, updates },
  })

  if (error) throw error
  return data
}
