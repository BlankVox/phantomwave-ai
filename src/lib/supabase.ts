import { createClient } from '@supabase/supabase-js'

let supabaseClient: any = null

const createSupabaseClient = () => {
    if (supabaseClient) return supabaseClient

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
    }

    supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
    return supabaseClient
}

export const supabase: any = new Proxy({}, {
    get(target, prop) {
        const client = createSupabaseClient()
        return client[prop]
    }
})

// Helper function to get user session
export const getSession = async () => {
    const client = createSupabaseClient()
    const { data: { session } } = await client.auth.getSession()
    return session
}

// Helper function to get current user
export const getCurrentUser = async () => {
    const client = createSupabaseClient()
    const { data: { user } } = await client.auth.getUser()
    return user
} 