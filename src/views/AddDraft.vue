<script setup lang="ts">
import { genClient } from '@/logics/auth'
import { useRouter } from 'vue-router'
import { useDraftsStore } from '@/logics/drafts'
import { ref } from 'vue'

const supabase = genClient()
const router = useRouter()
const draftsStore = useDraftsStore()
const title = ref('')

const submit = () => {
  draftsStore.addDraft(supabase, title.value)
  router.push(`/editor/${title.value}`)
}
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-xl">Writeland</h1>
    <input type="text" v-model="title" />
    <button @click="submit">Submit</button>
  </div>
</template>
