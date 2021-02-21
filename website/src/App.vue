<template>
  <div class="flex flex-col min-h-screen" :class="theme">
    <TheHeader></TheHeader>
    <main class="flex-1 px-2 py-4">
      <p class="text-center">Bienvenue dans la Fox Party</p>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, ref, readonly } from 'vue'
import TheHeader from '/src/components/TheHeader.vue'

export default defineComponent({
  name: 'App',
  components: { TheHeader },
  setup() {
    const theme = ref('light')

    const toggleTheme = () => {
      theme.value = theme.value === 'dark' ? 'light' : 'dark'
    }

    provide('theme', readonly(theme))
    provide('toggleTheme', toggleTheme)

    return { theme }
  },
  watch: {
    theme(newTheme, oldTheme) {
      if (oldTheme) {
        document.body.classList.remove(oldTheme)
      }
      if (newTheme) {
        document.body.classList.add(newTheme)
      }
    },
  },
})
</script>
