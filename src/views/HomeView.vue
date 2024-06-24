<script lang="ts">
import { defineComponent } from 'vue'
import Paper from '../components/Paper/Paper.vue'
import { Coin } from '../type'

export default defineComponent({
  name: 'HomeView',
  components: {
    Paper
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
  <Paper>
    <ul>
      <li v-for="coin in coins" :key="coin.id">
        {{ coin.name }} - {{ coin.symbol }} - {{ coin.current_price }}
      </li>
    </ul>
  </Paper>
</template>
