import { createApp, ref } from 'vue'

import { Theme } from 'src/types/theme'

import App from './App.vue'
import '/src/style/index.css'

const app = createApp(App)
app.mount('#app')

const theme = ref<Theme>(Theme.default)

app.config.globalProperties.$fpTheme = {
  get() {
    return theme.value
  },
  set(value: Theme) {
    theme.value = value
  },
}
