<script setup lang="ts">
import { genClient } from '@/logics/auth'
import { useRouter } from 'vue-router'
import { useDraftsStore } from '@/logics/drafts'
import { onMounted } from 'vue'

const router = useRouter()

const supabase = genClient()
const draftsStore = useDraftsStore()

const refresh = () => {
  draftsStore.refreshDraft(supabase)
}
const remove = (title: string) => {
  draftsStore.removeDraft(supabase, title)
}

onMounted(() => {
  if (draftsStore.drafts.length === 0) draftsStore.refreshDraft(supabase)
})
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="flex items-center">
      <button @click="refresh" class="flex">
        <span class="i-charm:refresh"></span>
      </button>
      <button @click="router.push('/add-draft')">Add Draft</button>
    </div>
    <li class="slide-enter-content">
      <ul v-for="item in draftsStore.drafts" class="flex items-center">
        <button
          @click="router.push({ path: '/editor/' + item.title })"
          class="text-my-blue ml-12px"
        >
          {{ item.title }}
        </button>
        <button @click="remove(item.title)" class="flex">
          <span class="i-charm:bin"></span>
        </button>
      </ul>
    </li>
  </div>
</template>
