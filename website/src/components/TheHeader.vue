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
import { defineComponent } from 'vue'

import { Theme } from '/src/types/theme.ts'

export default defineComponent({
  computed: {
    switchLabel() {
      return this.$fpTheme === Theme.dark ? 'Switch to light' : 'Switch to dark'
    },
  },
  methods: {
    toggleDarkTheme() {
      this.$fpTheme = this.$fpTheme === Theme.dark ? Theme.default : Theme.dark
    },
  },
})
</script>
