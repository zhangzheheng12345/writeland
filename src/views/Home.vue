<script setup lang="ts">
import { genClient } from '@/logics/auth'
import { useRouter } from 'vue-router'
import { useDraftsStore } from '@/logics/drafts'

const router = useRouter()

const supabase = genClient()
const draftsStore = useDraftsStore()

const refresh = () => {
  draftsStore.refreshDraft(supabase)
}
</script>

<template>
  <div class="flex flex-column items-center">
    <button @click="refresh">Refresh</button>
    <li class="slide-enter-content">
      <ul v-for="item in draftsStore.drafts">
        <a :href="`/drafts/${item.title}`" class="text-my-blue">{{
          item.title
        }}</a>
      </ul>
    </li>
  </div>
</template>
