// store/index.ts
import { createStore } from 'vuex'

interface State {
  count: number
}

const initialState: State = {
  count: parseInt(localStorage.getItem('count') || '0') || 0
}

const store = createStore<State>({
  state: initialState,
  mutations: {
    increment(state: State) {
      state.count++
      localStorage.setItem('count', state.count.toString())
    }
  },
  actions: {},
  getters: {}
})

export default store
