import { useStorage } from '@vueuse/core'
import { createClient } from '@supabase/supabase-js'
import { DB_URL } from '@/config'

export const anonKey = useStorage<string>('anon-key', '')
export const genClient = () => createClient(DB_URL, anonKey.value)
