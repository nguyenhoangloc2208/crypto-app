<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { RouterLink } from 'vue-router'
import Paper from '../Paper/Paper.vue'
import IconClose from '../icons/IconClose.vue'
import IconMenu from '../icons/IconMenu.vue'
import { useStore } from 'vuex'

export default defineComponent({
  components: {
    RouterLink,
    Paper,
    IconMenu,
    IconClose
  },
  setup() {
    const nav = ref(false)
    const user = ref<{ email?: string }>({})

    const handleNav = () => {
      nav.value = !nav.value
    }

    const handleSignOut = () => {
      // Logic để đăng xuất
      console.log('Signing out')
    }

    const store = useStore()

    const count = computed(() => store.state.count)

    const increment = () => {
      store.commit('increment')
    }

    return {
      nav,
      user,
      handleNav,
      handleSignOut,
      count,
      increment
    }
  }
})
</script>

<template>
  <header class="mx-auto">
    <Paper>
      <div class="rounded-div flex items-center justify-between h-20 font-bold mx-auto text-black">
        <RouterLink to="/">
          <h1 class="text-2xl">Beru Cryptobase</h1>
        </RouterLink>
        <div>
          <p>Count: {{ count }}</p>
          <button @click="increment">Increment</button>
        </div>
        <div v-if="user?.email">
          <RouterLink to="/account" class="p-4">Account</RouterLink>
          <button @click="handleSignOut">Sign out</button>
        </div>
        <div v-else class="hidden md:block">
          <RouterLink to="/signin" class="p-4 hover:text-frenchSkyBlue">Sign In</RouterLink>
          <RouterLink
            to="/signup"
            class="bg-button text-btnText px-5 py-2 ml-2 rounded-2xl shadow-lg hover:shadow-2xl text-white bg-frenchSkyBlue"
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
            <li @click="handleNav" class="border-b py-6">
              <RouterLink to="/account">Account</RouterLink>
            </li>
            <li class="py-6"><ThemeToggle /></li>
          </ul>
          <div class="flex flex-col w-full p-4">
            <RouterLink to="/signin">
              <button
                @click="handleNav"
                class="w-full my-2 p-3 bg-primary text-primary border border-secondary rounded-2xl shadow-xl"
              >
                Sign In
              </button>
            </RouterLink>
            <RouterLink @click="handleNav" to="/signup">
              <button class="w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl">
                Sign Up
              </button>
            </RouterLink>
          </div>
        </div>
      </div>
    </Paper>
  </header>
</template>
