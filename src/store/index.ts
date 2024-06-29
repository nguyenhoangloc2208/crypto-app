import { createStore } from 'vuex'
import themeModule from './modules/theme'
import authModule from './modules/auth'

const store = createStore({
  modules: {
    theme: themeModule,
    auth: authModule
  }
})

export default store
