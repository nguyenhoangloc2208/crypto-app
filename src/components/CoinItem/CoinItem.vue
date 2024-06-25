<template>
  <tr class="h-[80px] border-b overflow-hidden">
    <td @click="saveCoin">
      <component :is="savedCoin ? 'IconFillStar' : 'IconOutlineStar'" />
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
      <spark-line class="m-auto" :data="coin.sparkline_in_7d.price" :width="120" :height="30" />
    </td>
  </tr>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import IconFillStar from '../icons/IconFillStar.vue'
import IconOutlineStar from '../icons/IconOutlineStar.vue'
// import { useUserAuth } from '../context/AuthContext'
import { db } from '../../firebase'
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
  setup(props) {
    const savedCoin = ref(false)

    // const { user } = useUserAuth()

    // const saveCoin = async () => {
    //   if (user?.email) {
    //     savedCoin.value = true
    //     const coinPath = doc(db, 'users', user.email)
    //     await updateDoc(coinPath, {
    //       watchList: arrayUnion({
    //         id: props.coin.id,
    //         name: props.coin.name,
    //         image: props.coin.image,
    //         rank: props.coin.market_cap_rank,
    //         symbol: props.coin.symbol
    //       })
    //     })
    //   } else {
    //     alert('Please sign in to save a coin to your watch list')
    //   }
    // }

    return {
      savedCoin
      //   saveCoin
    }
  }
})
</script>
