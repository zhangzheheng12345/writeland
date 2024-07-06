import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import type { SupabaseClient } from '@supabase/supabase-js'
import { DB_TABLE_NAME } from '@/config'

export interface Draft {
  title: string
  content: string
}

export const useDraftsStore = defineStore('drafts-store', () => {
  const drafts = useStorage<Draft[]>('drafts', [])

  return {
    drafts,
    refreshDraft: async (supabaseClient: SupabaseClient) => {
      const { data, error } = await supabaseClient.from(DB_TABLE_NAME).select()
      if (error != null) {
        alert('刷新失败')
        return
      }
      drafts.value = data as Draft[]
    },
    addDraft: async (supabaseClient: SupabaseClient, title: string) => {
      drafts.value.push({ title, content: '' })
      const { error } = await supabaseClient.from(DB_TABLE_NAME).insert({
        title,
        content: ''
      })
      if (error != null) {
        alert('创建失败')
        return
      }
    },
    removeDraft: async (supabaseClient:SupabaseClient, title: string) => {
      drafts.value = drafts.value.filter((draft) => draft.title !== title)
      const { error } = await supabaseClient.from(DB_TABLE_NAME).delete().eq('title', title)
    },
    updateDraft: async (supabseClient: SupabaseClient, draft: Draft) => {
      const index = drafts.value.findIndex((d) => d.title === draft.title)
      if (index === -1) {
        alert('更新失败')
        return
      }
      drafts.value[index] = draft
      supabseClient.from(DB_TABLE_NAME).update({content: draft.content}).eq('title', draft.title)
    }
  }
})
