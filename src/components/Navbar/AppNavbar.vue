<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import Paper from '../Paper/Paper.vue'
import IconClose from '../icons/IconClose.vue'
import IconMenu from '../icons/IconMenu.vue'
import ThemeToggle from './ThemeToggle/ThemeToggle.vue'
import { useStore } from 'vuex'

export default defineComponent({
  components: {
    RouterLink,
    Paper,
    IconMenu,
    IconClose,
    ThemeToggle
  },
  setup() {
    const nav = ref(false)
    const user = ref<{ email?: string }>({})
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    const handleNav = () => {
      nav.value = !nav.value
      if (nav.value) {
        document.body.classList.add('overflow-hidden')
      } else {
        document.body.classList.remove('overflow-hidden')
      }
    }

    const handleSignOut = () => {
      store.dispatch('auth/logOut')
      user.value = {}
      if (route.path === '/account') {
        router.push('/')
      }
    }
    onMounted(() => {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        user.value = JSON.parse(storedUser)
        store.commit('auth/SET_USER', user.value)
      }
    })

    return {
      nav,
      user,
      handleNav,
      handleSignOut,
      isLoggedIn: computed(() => !!store.getters['auth/user'])
    }
  }
})
</script>

<template>
  <Paper class="rounded-div flex items-center justify-between h-20 font-bold">
    <RouterLink to="/">
      <h1 class="text-2xl">Beru Cryptobase</h1>
    </RouterLink>
    <div class="hidden md:block">
      <ThemeToggle />
    </div>
    <div v-if="isLoggedIn" class="hidden md:block">
      <RouterLink to="/account" class="p-4 hover:text-accent">Account</RouterLink>
      <button
        @click="handleSignOut"
        class="bg-button text-btnText px-5 py-2 ml-2 rounded-2xl shadow-lg hover:shadow-2xl"
      >
        Sign out
      </button>
    </div>
    <div v-else class="hidden md:block">
      <RouterLink to="/signin" class="p-4 hover:text-accent">Sign In</RouterLink>
      <RouterLink
        to="/signup"
        class="bg-button text-btnText px-5 py-2 ml-2 rounded-2xl shadow-lg hover:shadow-2xl"
        >Sign Up</RouterLink
      >
    </div>
    <!-- Menu Icon -->
    <div @click="handleNav" class="block md:hidden cursor-pointer z-10">
      <template v-if="nav">
        <icon-close />
      </template>
      <template v-else>
        <icon-menu />
      </template>
    </div>
    <!-- Mobile Menu -->
    <div
      :class="
        nav
          ? 'md:hidden fixed left-0 top-20 flex flex-col items-center justify-between w-full h-[90%] bg-primary ease-in duration-300 z-10'
          : 'fixed left-[-100%] top-20 h-[90%] flex flex-col items-center justify-between ease-in duration-300'
      "
    >
      <ul class="w-full p-4 mt-4">
        <li @click="handleNav" class="border-b py-6"><RouterLink to="/">Home</RouterLink></li>
        <li v-if="isLoggedIn" @click="handleNav" class="border-b py-6">
          <RouterLink to="/account">Account</RouterLink>
        </li>
        <li class="py-6"><ThemeToggle /></li>
      </ul>
      <div class="flex flex-col w-full p-4">
        <RouterLink v-if="!isLoggedIn" to="/signin">
          <button
            @click="handleNav"
            class="w-full my-2 p-3 bg-primary text-primary border border-secondary rounded-2xl shadow-xl"
          >
            Sign In
          </button>
        </RouterLink>
        <RouterLink @click="handleNav" to="/signup">
          <button
            v-if="isLoggedIn"
            @click="handleSignOut"
            class="w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl"
          >
            Sign out
          </button>
          <button v-else class="w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl">
            Sign Up
          </button>
        </RouterLink>
      </div>
    </div>
  </Paper>
</template>
