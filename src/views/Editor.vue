<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useDraftsStore } from '@/logics/drafts'
import { genClient } from '@/logics/auth'
import type { Draft } from '@/logics/drafts'
import { ref } from 'vue'

const supabase = genClient()

const route = useRoute()
const title = route.params.title as unknown as string

const draftsStore = useDraftsStore()
const draft: Draft = draftsStore.drafts.find(
  (draft) => draft?.title === title
) || {
  title: '404 Not Found',
  content: ''
}
const content = ref(draft.content)

const save = () =>
  draftsStore.updateDraft(supabase, {
    title: draft.title,
    content: content.value
  })
</script>

<template>
  <div class="flex flex-col">
    <button @click="save" class="flex">
      <span class="i-charm:floppy-disk"></span>
    </button>
    <h1 class="text-1.2em">{{ title }}</h1>
    <textarea v-model="content" class="h-screen w-full"></textarea>
  </div>
</template>
