<script setup lang="ts">
import { anonKey } from '@/logics/auth'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'vue-router'
import { DB_URL } from '@/config'
import { useDraftsStore } from '@/logics/drafts'

const router = useRouter()

const supabase = createClient(DB_URL, anonKey.value)
const draftsStore = useDraftsStore()

const refresh = () => {
  draftsStore.refreshDraft(supabase)
}
</script>

<template>
  <button @click="refresh">Refresh</button>
  <li class="slide-enter-content">
    <ul v-for="item in draftsStore.drafts">
      <a :href="`/drafts/${item.title}`" class="text-my-blue">{{
        item.title
      }}</a>
    </ul>
  </li>
</template>
