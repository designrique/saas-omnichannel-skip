import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.44.4'
import { corsHeaders } from './cors.ts'
import type { Database } from './types.ts'

// Create a Supabase client with the service role key
const supabaseAdmin = createClient<Database>(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
)

// Helper to check if a user is an admin
const isAdmin = async (supabase: any): Promise<boolean> => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError || !user) return false

  const { data: profile, error: profileError } = await supabaseAdmin
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  return !profileError && profile?.role === 'admin'
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) throw new Error('Missing Authorization header')

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } },
    )

    if (!(await isAdmin(supabase))) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const { method } = req
    const body = method !== 'GET' && method !== 'DELETE' ? await req.json() : {}

    switch (method) {
      case 'POST': {
        // Invite a new user
        const { email, full_name, role, subscription_status } = body
        const { error } = await supabaseAdmin.auth.admin.inviteUserByEmail(
          email,
          {
            data: { full_name, role, subscription_status },
            redirectTo: `${Deno.env.get('SITE_URL') || 'http://localhost:5173'}/login`,
          },
        )
        if (error) throw error
        return new Response(JSON.stringify({ message: 'User invited' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
      case 'PATCH': {
        // Update a user's profile
        const { userId, updates } = body
        const { data, error } = await supabaseAdmin
          .from('profiles')
          .update(updates)
          .eq('id', userId)
          .select()
          .single()
        if (error) throw error
        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
      default:
        return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
          status: 405,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
