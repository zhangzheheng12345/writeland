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
const draft = draftsStore.getDraft(title)
const content = ref(draft.content)

const savingLoading = ref(false)
const refreshLoading = ref(false)

const refresh = async () => {
  refreshLoading.value = true
  await draftsStore.refreshDraft(supabase)
  content.value = draftsStore.getDraft(title).content
  refreshLoading.value = false
}
const save = async () => {
  savingLoading.value = true
  await draftsStore.updateDraft(supabase, {
    title: draft.title,
    content: content.value
  })
  savingLoading.value = false
}
</script>

<template>
  <div class="flex flex-col">
    <div class="flex items-center">
      <button @click="save" class="flex">
        <span class="i-charm:floppy-disk" v-if="!savingLoading"></span>
        <span class="i-charm:rotate-clockwise" v-else></span>
      </button>
      <button @click="refresh" class="flex">
        <span
          class="i-charm:refresh transition-200"
          :class="refreshLoading ? 'animate-spin' : ''"
        ></span>
      </button>
    </div>
    <h1 class="text-1.65em mb-12px">{{ title }}</h1>
    <textarea v-model="content" class="h-screen w-full"></textarea>
  </div>
</template>
