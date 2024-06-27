import type { Module } from 'vuex'

interface ThemeState {
  theme: 'light' | 'dark'
}

const initialState: ThemeState = {
  theme: 'light'
}

const themeModule: Module<ThemeState, any> = {
  state: initialState,
  mutations: {
    setTheme(state: ThemeState, theme: 'light' | 'dark') {
      state.theme = theme
      const root = window.document.documentElement
      const isDark = theme === 'dark'
      root.classList.remove(isDark ? 'light' : 'dark')
      root.classList.add(theme)
      localStorage.setItem('theme', theme)
    }
  },
  actions: {
    initializeTheme({ commit }) {
      const storedTheme = localStorage.getItem('theme')
      console.log('aaa')

      if (storedTheme && ['dark', 'light'].includes(storedTheme)) {
        commit('setTheme', storedTheme as 'light' | 'dark')
      } else if (window.matchMedia) {
        const userMedia = window.matchMedia('(prefers-color-scheme: dark)')
        if (userMedia.matches) {
          commit('setTheme', 'dark')
        } else {
          commit('setTheme', 'light')
        }
      } else {
        commit('setTheme', 'light')
      }
    }
  },
  getters: {
    theme(state: ThemeState) {
      return state.theme
    }
  }
}

export default themeModule
