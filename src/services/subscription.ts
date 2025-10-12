import { supabase } from '@/lib/supabase/client'
import { Database } from '@/lib/supabase/types'

type SubscriptionStatus =
  Database['public']['Enums']['subscription_status_enum']

export const getSubscriptionStatus = async () => {
  const { data, error } = await supabase.functions.invoke('subscription', {
    method: 'GET',
  })

  if (error) {
    throw error
  }

  return data as { subscription_status: SubscriptionStatus | null }
}

export const updateSubscriptionStatus = async (status: SubscriptionStatus) => {
  const { data, error } = await supabase.functions.invoke('subscription', {
    method: 'PATCH',
    body: { subscription_status: status },
  })

  if (error) {
    throw error
  }

  return data as { id: string; subscription_status: SubscriptionStatus | null }
}
