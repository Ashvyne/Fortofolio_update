import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const supabase = (supabaseUrl && supabaseKey)
  ? createClient(supabaseUrl, supabaseKey)
  : {
      from: () => ({
        select: () => ({ order: () => Promise.resolve({ data: null, error: 'Missing credentials' }) }),
        insert: () => Promise.resolve({ error: 'Missing credentials' })
      }),
      auth: {
        getSession: () => Promise.resolve({ data: { session: null } }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: () => Promise.resolve({ error: { message: 'Supabase belum dikonfigurasi.' } }),
        signUp: () => Promise.resolve({ error: { message: 'Supabase belum dikonfigurasi. Tambahkan VITE_SUPABASE_URL dan VITE_SUPABASE_PUBLISHABLE_KEY di file .env' } }),
        resetPasswordForEmail: () => Promise.resolve({ error: { message: 'Supabase belum dikonfigurasi.' } }),
        signOut: () => Promise.resolve()
      }
    }
