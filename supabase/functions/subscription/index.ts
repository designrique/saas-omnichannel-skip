import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { corsHeaders } from './cors.ts'
import { createSupabaseClient } from './supabase-client.ts'
import { Database } from './types.ts'

type SubscriptionStatus =
  Database['public']['Enums']['subscription_status_enum']
const validStatuses: SubscriptionStatus[] = ['free', 'pro', 'inactive']

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('Missing Authorization header')
    }

    const supabase = createSupabaseClient(authHeader)
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      console.error('Auth error:', userError?.message)
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('profiles')
        .select('subscription_status')
        .eq('id', user.id)
        .single()

      if (error) {
        throw error
      }

      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (req.method === 'PATCH') {
      const body = await req.json()
      const { subscription_status } = body

      if (
        !subscription_status ||
        !validStatuses.includes(subscription_status)
      ) {
        return new Response(
          JSON.stringify({ error: 'Invalid subscription_status provided.' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          },
        )
      }

      const { data, error } = await supabase
        .from('profiles')
        .update({
          subscription_status: subscription_status,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)
        .select('id, subscription_status')
        .single()

      if (error) {
        throw error
      }

      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error processing request:', error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
