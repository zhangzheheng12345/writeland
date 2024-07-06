<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useDraftsStore } from '@/logics/drafts'
import type { Draft } from '@/logics/drafts'
import { ref } from 'vue'

const route = useRoute()
const id = route.params.id as unknown as number

const draftsStore = useDraftsStore()
const draft: Draft = draftsStore.drafts.find(draft => draft?.id === id) || {
  id: 0, title: '', content: ''
}
const content = ref(draft.content)

const save = () => draftsStore.updateDraft({id, title: draft.title, content: content.value})
</script>

<template>
  <button @click="">Save</button>
  <textarea v-model="content"></textarea>
</template>