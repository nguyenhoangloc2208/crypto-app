import type { Module } from 'vuex'
import { auth, db } from '../../firebase'
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  type User as FirebaseUser
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

interface AuthState {
  user: FirebaseUser | null
}

const authModule: Module<AuthState, any> = {
  namespaced: true,
  state: {
    user: null
  },
  mutations: {
    SET_USER(state, user: FirebaseUser | null) {
      state.user = user
    }
  },
  actions: {
    async signUp({ commit }, { email, password }) {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      await setDoc(doc(db, 'users', email), { watchList: [] })
      commit('SET_USER', userCredential.user)
    },
    async signIn({ commit }, { email, password }) {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      commit('SET_USER', userCredential.user)
    },
    async logOut({ commit }) {
      await signOut(auth)
      commit('SET_USER', null)
    },
    initAuth({ commit }) {
      onAuthStateChanged(auth, (user) => {
        commit('SET_USER', user)
      })
    }
  },
  getters: {
    user(state) {
      return state.user
    }
  }
}

export default authModule
