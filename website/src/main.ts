import { createApp } from 'vue'

import { Theme } from './types/theme'
import ThemePlugin from './plugins/theme'

import App from './App.vue'
import '/src/style/index.css'

createApp(App).use(ThemePlugin, { initial: Theme.default, localStorage: true }).mount('#app')
