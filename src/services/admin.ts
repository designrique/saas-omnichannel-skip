import { supabase } from '@/lib/supabase/client'

export type AdminDashboardStats = {
  totalUsers: number
  proUsers: number
  recentUsers: {
    id: string
    full_name: string | null
    email: string | null
    created_at: string
  }[]
}

export const getAdminDashboardStats =
  async (): Promise<AdminDashboardStats> => {
    const { count: totalUsers, error: totalUsersError } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })

    if (totalUsersError) throw totalUsersError

    const { count: proUsers, error: proUsersError } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('subscription_status', 'pro')

    if (proUsersError) throw proUsersError

    const { data: recentUsers, error: recentUsersError } = await supabase
      .from('profiles')
      .select('id, full_name, created_at, users(email)')
      .order('created_at', { ascending: false })
      .limit(5)

    if (recentUsersError) throw recentUsersError

    // The type from supabase gen is a bit tricky with related tables.
    // We manually map it to a simpler structure.
    const formattedRecentUsers = (recentUsers as any[]).map((user) => ({
      id: user.id,
      full_name: user.full_name,
      email: user.users?.email || null,
      created_at: user.created_at,
    }))

    return {
      totalUsers: totalUsers ?? 0,
      proUsers: proUsers ?? 0,
      recentUsers: formattedRecentUsers,
    }
  }
