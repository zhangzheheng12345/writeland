<script setup lang="ts">
import { genClient } from '@/logics/auth'
import { useRouter } from 'vue-router'
import { useDraftsStore } from '@/logics/drafts'
import { ref } from 'vue'

const supabase = genClient()
const router = useRouter()
const draftsStore = useDraftsStore()
const title = ref('')
const toNewDraftLoading = ref(false)

const submit = () => {
  draftsStore.addDraft(supabase, title.value)
  toNewDraftLoading.value = true
  router.push(`/editor/${title.value}`)
}
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <input type="text" v-model="title" />
    <button @click="submit" class="flex items-center">
      <span>SUBMIT</span>
      <span
        class="i-charm:chevrons-right transition-200 ml-3px"
        :class="toNewDraftLoading ? 'translate-x-4px' : ''"
      ></span>
    </button>
  </div>
</template>

<style scoped>
button:hover .i-charm\:chevrons-right {
  transform: translateX(4px);
}
</style>
