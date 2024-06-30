<script lang="ts">
import { defineComponent, ref, onMounted, watchEffect } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import SparkLine from '../../components/CoinItem/SparklineVue.vue'
import 'primeicons/primeicons.css'
import Paper from '../../components/Paper/Paper.vue'
import DOMPurify from 'dompurify'

export default defineComponent({
  name: 'CoinPage',
  components: {
    SparkLine,
    Paper
  },
  setup() {
    const coin = ref<any>({})
    const sparkline = ref({})
    const error = ref<string | null>(null)
    const route = useRoute()
    const routeParams = ref(route)
    const paperRef = ref<any>(null)
    const paperWidth = ref<number | null>(null)
    const url = `https://api.coingecko.com/api/v3/coins/${routeParams.value.params.coinId}?localization=false&sparkline=true`
    const isLoading = ref<boolean>(true)

    onMounted(async () => {
      try {
        const response = await axios.get(url)
        coin.value = response.data
        if (coin.value.description && coin.value.description.en) {
          coin.value.description.en = coin.value.description.en
            .replace(/\r\n/g, '<br>')
            .replace(/<a /g, '<a class="text-accent underline underline-offset-2"')
        }
        sparkline.value = response.data.market_data?.sparkline_7d.price
        error.value = null
      } catch (e) {
        console.error('Error fetching data:', e)
        error.value = 'Error fetching data: ' + e.message
      } finally {
        isLoading.value = false
      }
    })

    watchEffect(() => {
      if (paperRef.value) {
        paperWidth.value = paperRef.value.$el.clientWidth
      }
    })

    const sanitizeHtml = (dirtyHtml: string) => {
      return DOMPurify.sanitize(dirtyHtml)
    }

    return {
      coin,
      routeParams,
      sparkline,
      paperRef,
      paperWidth,
      error,
      sanitizeHtml,
      isLoading
    }
  }
})
</script>

<template>
  <div v-if="error" class="text-red-500">{{ error }}. Too Many Requests</div>
  <div v-else-if="isLoading" class="flex justify-center items-center h-[78vh]">
    <span class="loading loading-spinner loading-lg mt-3 mx-auto block"></span>
  </div>
  <Paper v-else class="my-12 py-8">
    <div v-if="coin.image" class="flex py-8">
      <img class="w-20 mr-8" :src="coin.image?.large" alt="/" />
      <div>
        <p class="text-3xl font-bold">{{ coin.name }} price</p>
        <p>({{ coin.symbol?.toUpperCase() }} / USD)</p>
      </div>
    </div>

    <div class="grid md:grid-cols-2 gap-8">
      <Paper class="p-2" ref="paperRef">
        <div class="flex justify-between">
          <p v-if="coin.market_data?.current_price" class="text-3xl font-bold">
            ${{ coin.market_data.current_price.usd.toLocaleString() }}
          </p>
          <p>7 Day</p>
        </div>
        <div v-if="sparkline && sparkline.length > 0">
          <SparkLine class="my-5" :data="sparkline" :width="paperWidth - 16" :height="60" />
        </div>
        <div class="flex justify-between py-4">
          <div>
            <p class="text-gray-500 text-sm">Market Cap</p>
            <p v-if="coin.market_data?.market_cap">
              ${{ coin.market_data.market_cap.usd.toLocaleString() }}
            </p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Volume (24h)</p>
            <p v-if="coin.market_data?.total_volume">
              ${{ coin.market_data.total_volume.usd.toLocaleString() }}
            </p>
          </div>
        </div>

        <div class="flex justify-between py-4">
          <div>
            <p class="text-gray-500 text-sm">24h High</p>
            <p v-if="coin.market_data?.high_24h">
              ${{ coin.market_data.high_24h.usd.toLocaleString() }}
            </p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">24h Low</p>
            <p v-if="coin.market_data?.low_24h">
              ${{ coin.market_data.low_24h.usd.toLocaleString() }}
            </p>
          </div>
        </div>
      </Paper>

      <Paper class="p-2">
        <p class="text-xl font-bold">Market Stats</p>
        <div class="flex justify-between py-4">
          <div>
            <p class="text-gray-500 text-sm">Market Rank</p>
            <p>{{ coin.market_cap_rank }}</p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Hashing Algorithm</p>
            <p v-if="coin.hashing_algorithm">{{ coin.hashing_algorithm }}</p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Trust Score</p>
            <p v-if="coin.market_data && coin.liquidity_score">
              {{ coin.liquidity_score.toFixed(2) }}
            </p>
          </div>
        </div>

        <div class="flex justify-between py-4">
          <div>
            <p class="text-gray-500 text-sm">Price Change (24h)</p>
            <p v-if="coin.market_data && coin.market_data.price_change_percentage_24h">
              {{ coin.market_data.price_change_percentage_24h.toFixed(2) }}%
            </p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Price Change (7d)</p>
            <p v-if="coin.market_data && coin.market_data.price_change_percentage_7d">
              {{ coin.market_data.price_change_percentage_7d.toFixed(2) }}%
            </p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Price Change (14d)</p>
            <p v-if="coin.market_data && coin.market_data.price_change_percentage_24h">
              {{ coin.market_data.price_change_percentage_14d.toFixed(2) }}%
            </p>
          </div>
        </div>
        <div class="flex justify-between py-4">
          <div>
            <p class="text-gray-500 text-sm">Price Change (30d)</p>
            <p v-if="coin.market_data && coin.market_data.price_change_percentage_30d">
              {{ coin.market_data.price_change_percentage_30d.toFixed(2) }}%
            </p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Price Change (60d)</p>
            <p v-if="coin.market_data && coin.market_data.price_change_percentage_60d">
              {{ coin.market_data.price_change_percentage_60d.toFixed(2) }}%
            </p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Price Change (1y)</p>
            <p v-if="coin.market_data && coin.market_data.price_change_percentage_1y">
              {{ coin.market_data.price_change_percentage_1y.toFixed(2) }}%
            </p>
          </div>
        </div>
        <div class="flex justify-around p-8 text-accent">
          <i class="pi pi-twitter"></i>
          <i class="pi pi-facebook"></i>
          <i class="pi pi-reddit"></i>
          <i class="pi pi-github"></i>
        </div>
      </Paper>
    </div>

    <!-- Description -->
    <div class="py-4">
      <p class="text-xl font-bold">About {{ coin.name }}</p>
      <p
        class="mt-5 coin-description"
        v-if="coin.description"
        v-html="sanitizeHtml(coin.description.en)"
      ></p>
    </div>
  </Paper>
</template>
