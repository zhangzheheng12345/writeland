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
    <h1 class="text-1.3em">Writeland</h1>
    <input type="text" v-model="passkey" />
    <button @click="submit">Sign In</button>
  </div>
</template>
