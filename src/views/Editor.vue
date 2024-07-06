<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useDraftsStore } from '@/logics/drafts'
import type { Draft } from '@/logics/drafts'
import { ref } from 'vue'

const route = useRoute()
const title = route.params.title as unknown as string

const draftsStore = useDraftsStore()
const draft: Draft = draftsStore.drafts.find(
  (draft) => draft?.title === title
) || {
  id: 0,
  title: '404 Not Found',
  content: ''
}
const content = ref(draft.content)

const save = () =>
  draftsStore.updateDraft({ title: draft.title, content: content.value })
</script>

<template>
  <button @click="">Save</button>
  <h1>{{ title }}</h1>
  <textarea v-model="content"></textarea>
</template>
