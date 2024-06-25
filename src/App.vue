<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import Navbar from './components/Navbar/AppNavbar.vue'
import { Coin } from './type'
import axios from 'axios'

export default defineComponent({
  components: {
    Navbar
  },
  setup() {
    const coins = ref<Coin[]>([])
    const url = ref(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&locale=en`
    )
    watchEffect(async () => {
      if (coins.value.length === 0) {
        try {
          const response = await axios.get(url.value)
          coins.value = response.data
          console.log(response.data)
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
  <div class="md:w-3/4 min-w-[300px] mx-auto">
    <Navbar />
    <router-view :coins="coins" class="mt-12"></router-view>
  </div>
</template>
