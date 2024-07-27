<script setup lang="ts">
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'
import { useDraftsStore } from '@/logics/drafts'
import { genClient } from '@/logics/auth'
import type { Draft } from '@/logics/drafts'
import { ref, computed, watch } from 'vue'

const supabase = genClient()

const route = useRoute()
const router = useRouter()
const title = route.params.title as unknown as string

const draftsStore = useDraftsStore()
const draft = draftsStore.getDraft(title)
const content = ref(draft.content)
const unsaved = ref(false)

const savingLoading = ref(false)
const refreshLoading = ref(false)

const refresh = async () => {
  refreshLoading.value = true
  await draftsStore.refreshDraft(supabase)
  content.value = draftsStore.getDraft(title).content
  refreshLoading.value = false
}
const save = async () => {
  if (unsaved.value || !draftsStore.unsavedList.includes(title)) return
  savingLoading.value = true
  await draftsStore.updateDraftContent(supabase, {
    title: draft.title,
    content: content.value
  })
  unsaved.value = false
  draftsStore.unsavedList.filter((t) => t != title)
  savingLoading.value = false
}
watch(content, () => {
  if (unsaved.value) return
  draftsStore.unsavedList.push(title)
  unsaved.value = true
})

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

const paraNum = computed(
  () => content.value.split('\n').filter((p) => p.length > 0).length
)
const charNumTotal = computed(() => content.value.length)
const charNumNoPunc = computed(() => {
  const punc = '.,?!;:()[]{}"\'$。，？！；：（）【】｛｝—、“”’‘¥ \t\n\r'.split(
    ''
  )
  return content.value.split('').filter((c) => !punc.includes(c)).length
})

onBeforeRouteLeave(async () => {
  if (draft.title === newTitle.value) await save()
})
</script>

<template>
  <div class="flex flex-col">
    <div class="flex items-center">
      <button @click="router.push('/home')" class="flex hover-up">
        <span class="i-charm:cards"></span>
      </button>
      <button @click="save" class="flex hover-up">
        <span
          class="i-charm:floppy-disk"
          :class="savingLoading ? 'animate-bounce' : ''"
        ></span>
      </button>
      <button @click="refresh" class="flex hover-up">
        <span
          class="i-charm:refresh"
          :class="refreshLoading ? 'animate-spin' : ''"
        ></span>
      </button>
    </div>
    <button
      class="text-1.65em text-left p-0 mb-13px mt-10px ml-8px hover-up"
      v-if="!editingTitle"
      @dblclick="editingTitle = true"
    >
      # {{ title }}
    </button>
    <div class="flex items-center w-full" v-else>
      <input
        type="text"
        v-model="newTitle"
        class="py-5px px-7px text-1.4em w-75%"
        :class="updatingTitle ? 'animate-bounce' : ''"
        @keyup.enter="updateTitle"
      />
      <button class="flex hover-up" @click="cancelUpdatingTitle">
        <span class="i-charm:circle-cross"></span>
      </button>
    </div>
    <textarea v-model="content" class="h-80vh w-full"></textarea>
    <div class="mx-6px my-10px">
      {{ paraNum }} / {{ charNumTotal }} / {{ charNumNoPunc }}
    </div>
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
