<script lang="ts">
import { defineComponent, ref } from 'vue'
import { RouterLink } from 'vue-router'
import IconFillStar from '../icons/IconFillStar.vue'
import IconOutlineStar from '../icons/IconOutlineStar.vue'
import { Coin } from '../../type'
import SparkLine from './SparklineVue.vue'

export default defineComponent({
  name: 'CoinItem',
  components: {
    IconFillStar,
    IconOutlineStar,
    RouterLink,
    SparkLine
  },
  props: {
    coin: {
      type: Object as () => Coin,
      required: true
    }
  },
  setup() {
    const savedCoin = ref(false)

    const saveCoin = () => {
      savedCoin.value = !savedCoin.value
    }

    const isSmallScreen = window.innerWidth < 768

    return {
      savedCoin,
      saveCoin,
      isSmallScreen
    }
  }
})
</script>

<template>
  <tr class="h-[80px] border-b overflow-hidden">
    <td @click="saveCoin" class="cursor-pointer">
      <component :is="savedCoin ? 'IconFillStar' : 'IconOutlineStar'" class="text-primary" />
    </td>
    <td>{{ coin.market_cap_rank }}</td>
    <td>
      <RouterLink :to="`/coin/${coin.id}`">
        <div class="flex items-center">
          <img class="w-6 mr-2 rounded-full" :src="coin.image" :alt="coin.id" />
          <p class="hidden sm:table-cell">{{ coin.name }}</p>
        </div>
      </RouterLink>
    </td>
    <td>{{ coin.symbol.toUpperCase() }}</td>
    <td>${{ coin.current_price.toLocaleString() }}</td>
    <td>
      <p :class="coin.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600'">
        {{ coin.price_change_percentage_24h.toFixed(2) }}%
      </p>
    </td>
    <td class="w-[180px] hidden md:table-cell">${{ coin.total_volume.toLocaleString() }}</td>
    <td class="w-[180px] hidden sm:table-cell">${{ coin.market_cap.toLocaleString() }}</td>
    <td>
      <spark-line
        class="m-auto"
        :data="coin.sparkline_in_7d.price"
        :width="isSmallScreen ? 80 : 120"
        :height="isSmallScreen ? 20 : 30"
      />
    </td>
  </tr>
</template>
