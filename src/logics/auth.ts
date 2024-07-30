import { useStorage } from '@vueuse/core'
import { createClient } from '@supabase/supabase-js'

export const dbUrl = useStorage<string>('db-url', '')
export const anonKey = useStorage<string>('anon-key', '')
export const genClient = () => createClient(dbUrl.value, anonKey.value)
