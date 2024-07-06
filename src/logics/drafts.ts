import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import type { SupabaseClient } from '@supabase/supabase-js'
import { DB_TABLE_NAME } from '@/config'

export interface Draft {
  id: number
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
        alert('请求错误')
        return
      }
      drafts.value = data as Draft[]
    },
    addDraft: (draft: Draft) => {
      drafts.value.push(draft)
      // TODO: Add draft to DB
    },
    removeDraft: (title: string) => {
      drafts.value = drafts.value.filter(draft => draft.title !== title)
      // TODO: Remove draft from DB
    },
    updateDraft: (draft: Draft) => {
      const index = drafts.value.findIndex(d => d.id === draft.id)
      if (index === -1) {
        alert('更新失败')
        return
      }
      drafts.value[index] = draft
      // TODO: Update draft in DB
    }
  }
})
