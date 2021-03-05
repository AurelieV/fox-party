<template>
  <div class="flex flex-col min-h-screen" :class="theme">
    <TheHeader></TheHeader>
    <main class="flex-1 px-2 py-4">
      <p class="text-center">Bienvenue dans la Fox Party</p>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheHeader from '@/components/TheHeader.vue'

export default defineComponent({
  name: 'App',
  components: { TheHeader },
})
</script>
