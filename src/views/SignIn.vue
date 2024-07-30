<script setup lang="ts">
import { anonKey, dbUrl } from '@/logics/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const passkey = ref('')
const router = useRouter()
const toHomeLoading = ref(false)

const submit = async () => {
  const res = await (await fetch(`/get-anon-key/${passkey.value}`)).json()
  const anon = res?.anon as string
  const url = res?.url as string
  if (anon === 'Wrong Passkey') alert('WRONG PASSKEY')
  else {
    anonKey.value = anon
    dbUrl.value = url
    toHomeLoading.value = true
    router.push('/home')
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-1.75em m-15px">WRITELAND</h1>
    <input type="password" v-model="passkey" />
    <button @click="submit" class="flex items-center">
      <span>SIGN IN</span>
      <span
        class="i-charm:chevrons-right transition-200 ml-3px"
        :class="toHomeLoading ? 'translate-x-4px' : ''"
      ></span>
    </button>
  </div>
</template>

<style scoped>
button:hover .i-charm\:chevrons-right {
  transform: translateX(4px);
}
</style>
