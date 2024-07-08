<script setup lang="ts">
import { anonKey } from '@/logics/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const passkey = ref('')
const passState = ref<'none' | 'pass' | 'wrong'>('none')
const router = useRouter()

const submit = async () => {
  const res = await fetch(`/get-anon-key/${passkey.value}`)
  const anon = (await res.json())?.anon as string
  if (anon === 'Wrong Passkey') passState.value = 'wrong'
  else {
    anonKey.value = anon
    passState.value = 'pass'
    // TODO: sleep 300ms
    router.push('/home')
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-1.7em m-15px">WRITELAND</h1>
    <input type="password" v-model="passkey" />
    <button @click="submit" class="flex items-center">
      <span>SIGN IN</span>
      <span class="i-charm:chevrons-right transition-200"></span>
    </button>
  </div>
</template>

<style scoped>
button:hover .i-charm\:chevrons-right {
  transform: translateX(4px);
}
</style>
