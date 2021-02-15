<template>
  <header class="flex items-center w-full px-2 py-3 bg-violet-500 dark:bg-purple-900">
    <h1 class="flex-1 text-xl md:text-2xl dark:text-white">Fox Party</h1>
    <button
      class="px-2 py-2 rounded focus:outline-none bg-amber-200 hover:bg-amber-300 focus-visible:outline-white"
      @click="toggleTheme"
    >
      {{ switchLabel }}
    </button>
  </header>
</template>

<script>
import { defineComponent, inject } from 'vue'
export default defineComponent({
  setup() {
    const theme = inject('theme')
    const toggleTheme = inject('toggleTheme')

    return { theme, toggleTheme }
  },
  computed: {
    switchLabel() {
      return this.theme === 'dark' ? 'Switch to light' : 'Switch to dark'
    },
  },
})
</script>
