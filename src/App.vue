<script lang="ts">
import { defineComponent, ref } from 'vue'
import Navbar from './components/Navbar/AppNavbar.vue'
import { Coin } from './type'
import axios from 'axios'
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import CustomFooter from './components/Footer/AppFooter.vue'

export default defineComponent({
  components: {
    Navbar,
    CustomFooter
  },
  setup() {
    const store = useStore()
    const coins = ref<Coin[]>([])

    onMounted(async () => {
      await store.dispatch('initializeTheme')
      await store.dispatch('auth/initAuth')

      if (coins.value.length === 0) {
        try {
          const response = await axios.get(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&locale=en`
          )
          coins.value = response.data
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }
    })

    return {
      coins
    }
  }
})
</script>

<template>
  <div class="w-full bg-secondary">
    <div class="md:w-3/4 min-w-[300px] mx-auto">
      <Navbar />
      <router-view :coins="coins" class="mt-12 min-h-[30vh]"></router-view>
      <CustomFooter />
    </div>
  </div>
</template>
