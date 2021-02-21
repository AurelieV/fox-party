<template>
  <header class="flex items-center w-full px-2 py-3 bg-primary">
    <h1 class="flex-1 text-xl md:text-2xl text-text-on-primary">Fox Party</h1>
    <button
      class="px-2 py-2 rounded focus:outline-none bg-secondary hover:bg-secondary-dark focus-visible:outline-white text-text-on-secondary"
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
