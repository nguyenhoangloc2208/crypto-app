<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Paper from '../../components/Paper/Paper.vue'
import SavedCoin from '../../components/SavedCoin/SavedCoin.vue'

export default defineComponent({
  components: {
    Paper,
    SavedCoin
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const user = ref<any>(store.getters['auth/user'])

    const handleSignOut = async () => {
      try {
        await store.dispatch('auth/logOut')
        router.push('/')
      } catch (error) {
        console.error('Sign-out error:', error.message)
      }
    }

    return {
      user,
      handleSignOut
    }
  }
})
</script>
<template>
  <div class="max-w-[1140px] mx-auto">
    <Paper class="flex justify-between items-center my-12 py-8 relative">
      <div>
        <h1 class="text-2xl font-bold mb-5">Account</h1>
        <div>
          <p>Welcome, {{ user?.email }}</p>
        </div>
      </div>
      <div>
        <button
          @click="handleSignOut"
          class="absolute md:block top-8 right-0 bg-button text-btnText px-8 font-medium py-2 rounded-2xl shadow-lg hover:shadow-2xl"
        >
          Sign Out
        </button>
      </div>
    </Paper>
    <Paper class="flex justify-between items-center my-12 py-8">
      <div class="w-full min-h-[300px]">
        <h1 class="text-2xl font-bold py-4">Watch List</h1>
        <SavedCoin />
      </div>
    </Paper>
  </div>
</template>
