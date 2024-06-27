<script lang="ts">
import { defineComponent } from 'vue'
import { Coin } from '../type'
import Trending from '../components/Trending/TrendingCoin.vue'
import CoinSearch from '../components/CoinSearch/CoinSearch.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    Trending,
    CoinSearch
  },
  props: {
    coins: {
      type: Array as () => Coin[],
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>
<template>
  <div>
    <CoinSearch :coins="coins" />
    <Trending />
  </div>
</template>
