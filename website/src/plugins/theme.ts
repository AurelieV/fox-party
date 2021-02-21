import { App, ref, inject, readonly, Ref, watch } from 'vue'

interface PluginOptions {
  initial?: string
  localStorage?: boolean
}

interface ThemeObject {
  theme: Ref<string>
  setTheme: (value: string) => void
}

const PROVIDE_TOKEN = Symbol('themeToken')
const DEFAULT_OPTIONS = {
  initial: 'default',
  localStorage: false,
}
const LOCAL_STORAGE_KEY = 'userTheme'

export default {
  install(app: App, options: PluginOptions): void {
    const mergedOptions = { ...DEFAULT_OPTIONS, ...options }
    const theme = ref<string>(mergedOptions.initial)
    app.provide<ThemeObject>(PROVIDE_TOKEN, {
      theme: readonly(theme),
      setTheme(value: string) {
        theme.value = value
      },
    })

    watch(theme, (newTheme, oldTheme) => {
      if (oldTheme) {
        document.body.classList.remove(oldTheme)
      }
      if (newTheme) {
        document.body.classList.add(newTheme)
      }
    })

    const isBrowser = typeof window !== 'undefined'
    if (mergedOptions.localStorage && isBrowser) {
      const userTheme = window.localStorage.getItem(LOCAL_STORAGE_KEY)
      if (userTheme) {
        theme.value = userTheme
      }
      watch(theme, (newTheme) => {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, newTheme)
      })
      window.addEventListener('storage', ({ key, newValue }) => {
        if (key === LOCAL_STORAGE_KEY && newValue !== null) {
          theme.value = newValue
        }
      })
    }
  },
}

export function useTheme(): ThemeObject {
  return inject<ThemeObject>(PROVIDE_TOKEN) as ThemeObject
}
