<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import CoinItem from '../components/CoinItem/CoinItem.vue'
import { Coin } from '../type'
import Paper from '../components/Paper/Paper.vue'

export default defineComponent({
  name: 'CoinSearch',
  components: {
    CoinItem,
    Paper
  },
  props: {
    coins: {
      type: Array as () => Coin[],
      required: true
    }
  },
  setup(props) {
    const searchText = ref('')

    const filteredCoins = computed(() =>
      props.coins.filter((value) => {
        if (searchText.value === '') {
          return value
        } else if (value.name.toLowerCase().includes(searchText.value.toLowerCase())) {
          return value
        }
      })
    )

    return {
      searchText,
      filteredCoins
    }
  }
})
</script>
<template>
  <Paper>
    <div class="rounded-div my-4">
      <div class="flex flex-col md:flex-row justify-between pt-4 pb-6 text-center md:text-right">
        <h1 class="text-2xl font-bold my-2">Search Crypto</h1>
        <form>
          <input
            v-model="searchText"
            type="text"
            placeholder="search a coin"
            class="border border-input w-full px-4 py-2 shadow-xl"
          />
        </form>
      </div>
      <table class="w-full border-collapse text-center">
        <thead>
          <tr class="border-b">
            <th></th>
            <th class="px-4">#</th>
            <th class="text-left">Coin</th>
            <th></th>
            <th>Price</th>
            <th>24h</th>
            <th class="hidden md:table-cell">24h Volume</th>
            <th class="hidden sm:table-cell">Mkt</th>
            <th>Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          <CoinItem v-for="coin in filteredCoins" :key="coin.id" :coin="coin" />
        </tbody>
      </table>
    </div>
  </Paper>
</template>
