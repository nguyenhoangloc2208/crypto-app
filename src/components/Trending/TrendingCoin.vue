<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import axios from 'axios'
import Paper from '../Paper/Paper.vue'

interface Coin {
  item: {
    name: string
    symbol: string
    small: string
    price_btc: number
  }
}

export default defineComponent({
  name: 'TrendingCoin',
  components: {
    Paper
  },
  setup() {
    const trending = ref([] as Coin[])

    const fetchTrending = async () => {
      const url = 'https://api.coingecko.com/api/v3/search/trending'
      try {
        const response = await axios.get(url)
        trending.value = response.data.coins
      } catch (error) {
        console.error('Error fetching trending coins:', error)
      }
    }

    onMounted(fetchTrending)

    return {
      trending
    }
  }
})
</script>

<template>
  <Paper class="text-primary my-12 py-8">
    <h1 class="text-2xl font-bold py-4">Trending Coins</h1>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Paper
        v-for="coin in trending"
        :key="coin.item.name"
        class="flex justify-between hover:scale-105 ease-in-out duration-300 p-4"
      >
        <div>
          <div>
            <img :src="coin.item.small" alt="/" class="rounded-full mr-4" />
            <div>
              <p class="font-bold">{{ coin.item.name }}</p>
              <p>{{ coin.item.symbol }}</p>
            </div>
          </div>
          <div>
            <img
              src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?154703379"
              alt="/"
              class="w-4 mr-4"
            />
            <p>{{ coin.item.price_btc.toFixed(7) }}</p>
          </div>
        </div>
      </Paper>
    </div>
  </Paper>
</template>
