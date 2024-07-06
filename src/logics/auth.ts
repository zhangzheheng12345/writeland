import { useStorage } from '@vueuse/core'

export const anonKey = useStorage<string>('anon-key', '')
