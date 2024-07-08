<script setup lang="ts">
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'
import { useDraftsStore } from '@/logics/drafts'
import { genClient } from '@/logics/auth'
import type { Draft } from '@/logics/drafts'
import { ref } from 'vue'

const supabase = genClient()

const route = useRoute()
const router = useRouter()
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
  if (draft.content === content.value) return
  savingLoading.value = true
  await draftsStore.updateDraftContent(supabase, {
    title: draft.title,
    content: content.value
  })
  savingLoading.value = false
}

const editingTitle = ref(false)
const updatingTitle = ref(false)
const newTitle = ref(draft.title)
const updateTitle = async () => {
  updatingTitle.value = true
  await draftsStore.updateDraftTitle(supabase, draft.title, newTitle.value)
  router.push(`/editor/${newTitle}`)
}
const cancelUpdatingTitle = () => {
  editingTitle.value = false
  newTitle.value = draft.title
}

onBeforeRouteLeave(async () => await save())
</script>

<template>
  <div class="flex flex-col">
    <div class="flex items-center">
      <button @click="router.push('/home')" class="flex">
        <span class="i-charm:cards"></span>
      </button>
      <button @click="save" class="flex">
        <span
          class="i-charm:floppy-disk"
          :class="savingLoading ? 'animate-bounce' : ''"
        ></span>
      </button>
      <button @click="refresh" class="flex">
        <span
          class="i-charm:refresh transition-200"
          :class="refreshLoading ? 'animate-spin' : ''"
        ></span>
      </button>
    </div>
    <button
      class="text-1.65em text-left p-0 mb-14px ml-8px"
      v-if="!editingTitle"
      @dblclick="editingTitle = true"
    >
      # {{ title }}
    </button>
    <div class="flex items-center w-full" v-else>
      <input
        type="text"
        v-model="newTitle"
        class="wa py-5px px-7px text-1.4em w-75%"
        :class="updatingTitle ? 'animate-bounce' : ''"
        @keyup.enter="updateTitle"
      />
      <button class="flex" @click="cancelUpdatingTitle">
        <span class="i-charm:circle-cross"></span>
      </button>
    </div>
    <textarea v-model="content" class="h-screen w-full"></textarea>
  </div>
</template>

<style scoped>
button {
  padding: 3px;
}
button span {
  font-size: 1.1em;
}
</style>