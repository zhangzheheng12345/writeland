<script setup lang="ts">
import { genClient } from '@/logics/auth'
import { useRouter } from 'vue-router'
import { useDraftsStore } from '@/logics/drafts'
import { onMounted, ref } from 'vue'

const router = useRouter()

const supabase = genClient()
const draftsStore = useDraftsStore()

const refreshLoading = ref(false)

const refresh = async () => {
  refreshLoading.value = true
  await draftsStore.refreshDraft(supabase)
  refreshLoading.vaue = false
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
        <span class="i-charm:refresh" :class="refreshLoading ? 'animate-spin' : ''"></span>
      </button>
      <button @click="router.push('/add-draft')" class="flex">
        <span class="i-charm:plus"></span>
      </button>
    </div>
    <li class="slide-enter-content">
      <ul v-for="item in draftsStore.drafts" class="flex items-center">
        <button
          @click="router.push({ path: '/editor/' + item.title })"
          class="text-my-blue ml-12px flex"
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
