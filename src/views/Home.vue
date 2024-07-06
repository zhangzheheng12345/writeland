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

onMounted(() => {
  if (draftsStore.drafts.length === 0) draftsStore.refreshDraft(supabase)
})
</script>

<template>
  <div class="flex flex-column items-center">
    <button @click="refresh">Refresh</button>
    <button @click="router.push('/add-draft')">Add Draft</button>
    <li class="slide-enter-content">
      <ul
        v-for="item in draftsStore.drafts"
        class="border-solid border-2px border-deep-gray rounded-8px margin-8px"
      >
        <a
          :href="`/editor/${item.title}`"
          class="text-my-blue text-center w-full"
        >
          {{ item.title }}
        </a>
      </ul>
    </li>
  </div>
</template>
