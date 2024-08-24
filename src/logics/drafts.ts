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
    getDraft: (title: string) =>
      drafts.value.find((draft) => draft?.title === title) || {
        title: '404 NOT FOUND',
        content: ''
      },
    refreshDraft: async (supabaseClient: SupabaseClient) => {
      const { data, error } = await supabaseClient.from(DB_TABLE_NAME).select()
      if (error != null) {
        alert('REFRESHING FAILED')
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
      if (error != null) alert('CREATING FAILED')
    },
    removeDraft: async (supabaseClient: SupabaseClient, title: string) => {
      drafts.value = drafts.value.filter((draft) => draft.title !== title)
      const { error } = await supabaseClient
        .from(DB_TABLE_NAME)
        .delete()
        .eq('title', title)
      if (error != null) alert('DELETING FAILED')
    },
    updateDraft: async (
      supabaseClient: SupabaseClient,
      draft: Draft,
      originalTitle: string
    ) => {
      const index = drafts.value.findIndex((d) => d.title === originalTitle)
      if (index === -1) {
        alert('UPDATING FAILED')
        return
      }
      drafts.value[index] = draft
      const { error } = await supabaseClient
        .from(DB_TABLE_NAME)
        .update(draft)
        .eq('title', originalTitle)
      if (error != null) alert('UPDATING FAILED')
    }
  }
})
