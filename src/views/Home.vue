<script setup lang="ts">
import { genClient } from '@/logics/auth'
import { useRouter } from 'vue-router'
import { useDraftsStore } from '@/logics/drafts'
import { onMounted, ref } from 'vue'

const router = useRouter()

const supabase = genClient()
const draftsStore = useDraftsStore()

const refreshLoading = ref(false)
const removeLoading = ref(false)

const refresh = async () => {
  refreshLoading.value = true
  await draftsStore.refreshDraft(supabase)
  refreshLoading.value = false
}
const remove = async (title: string) => {
  removeLoading.value = true
  draftsStore.removeDraft(supabase, title)
  removeLoading.value = false
}

onMounted(() => {
  if (draftsStore.drafts.length === 0) draftsStore.refreshDraft(supabase)
})
</script>

<template>
  <div class="flex flex-col items-center">
    <h1 class="text-1.7em m-15px">WRITELAND</h1>
    <div class="flex items-center mb-12px">
      <button @click="refresh" class="flex">
        <span
          class="i-charm:refresh transition-200"
          :class="refreshLoading ? 'animate-spin' : ''"
        ></span>
      </button>
      <button @click="router.push('/add-draft')" class="flex">
        <span class="i-charm:plus"></span>
      </button>
    </div>
    <li class="slide-enter-content">
      <ul
        v-for="item in draftsStore.drafts"
        class="flex items-center justify-between min-w-350px"
      >
        <button
          @click="router.push({ path: '/editor/' + item.title })"
          class="text-my-blue flex hover:decoration-underline"
        >
          {{ item.title }}
        </button>
        <button @click="remove(item.title)" class="flex">
          <span
            class="i-charm:bin text-my-red"
            :class="removeLoading ? 'animate-bounce' : ''"
          ></span>
        </button>
      </ul>
    </li>
  </div>
</template>
