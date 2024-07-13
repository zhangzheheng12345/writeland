<script setup lang="ts">
import { genClient } from '@/logics/auth'
import { useRouter } from 'vue-router'
import { useDraftsStore } from '@/logics/drafts'
import { onMounted, ref } from 'vue'
import { anonKey } from '@/logics/auth'

const router = useRouter()

const supabase = genClient()
const draftsStore = useDraftsStore()

const refreshLoading = ref(false)
const removeLoading = ref(false)
const removeConfirmIndex = ref(-1)

const refresh = async () => {
  refreshLoading.value = true
  await draftsStore.refreshDraft(supabase)
  refreshLoading.value = false
}
const remove = async (title: string) => {
  removeLoading.value = true
  await draftsStore.removeDraft(supabase, title)
  removeConfirmIndex.value = -1
  removeLoading.value = false
}
const signOut = () => {
  anonKey.value = ''
  draftsStore.drafts = []
  router.push('/sign-in')
}

onMounted(() => draftsStore.refreshDraft(supabase))
</script>

<template>
  <div class="flex flex-col items-center">
    <h1 class="text-1.75em m-15px">WRITELAND</h1>
    <div class="flex items-center mb-12px">
      <button @click="refresh" class="flex hover-up">
        <span
          class="i-charm:refresh"
          :class="refreshLoading ? 'animate-spin' : ''"
        ></span>
      </button>
      <button @click="router.push('/add-draft')" class="flex hover-up">
        <span class="i-charm:plus"></span>
      </button>
      <button @click="signOut" class="flex hover-up">
        <span class="i-charm:sign-out"></span>
      </button>
    </div>
    <li class="slide-enter-content">
      <ul
        v-for="(item, index) in draftsStore.drafts"
        class="flex items-center justify-between min-w-350px"
      >
        <button
          @click="router.push({ path: '/editor/' + item.title })"
          class="text-my-blue flex hover:decoration-underline"
        >
          {{ item.title }}
        </button>
        <button
          @click="removeConfirmIndex = index"
          class="flex"
          v-if="index !== removeConfirmIndex"
        >
          <span class="i-charm:bin text-my-red hover-up"></span>
        </button>
        <div v-else>
          <button class="flex hover-up" @click="removeConfirmIndex = -1">
            <span class="i-charm:circle-cross"></span>
          </button>
          <button
            class="flex hover-up"
            @click="remove(item.title)"
            :class="removeLoading ? 'animate-bounce' : ''"
          >
            <span class="i-charm:tick text-my-red"></span>
          </button>
        </div>
      </ul>
    </li>
  </div>
</template>
