<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import IconFillStar from '../icons/IconFillStar.vue'
import IconOutlineStar from '../icons/IconOutlineStar.vue'
import { Coin, User } from '../../type'
import SparkLine from './SparklineVue.vue'
import { useStore } from 'vuex'
import { db } from '../../firebase'
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'

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
    const savedCoin = ref<boolean>(false)
    const store = useStore()
    const user = ref<User>(store.getters['auth/user'])
    const coinPath = doc(db, 'users', `${user.value?.email}`)
    const isLoading = ref<boolean>(false)

    const checkIfCoinSaved = async () => {
      isLoading.value = true
      if (user.value?.email) {
        const docSnap = await getDoc(coinPath)
        if (docSnap.exists()) {
          const data = docSnap.data()
          savedCoin.value = data.watchList.some((coin: Coin) => coin.id === props.coin.id)
        }
      }
      isLoading.value = false
    }

    const saveOrDeleteCoin = async () => {
      if (user.value?.email) {
        const {
          id,
          name,
          image,
          market_cap_rank,
          symbol,
          current_price,
          total_volume,
          market_cap,
          price_change_percentage_24h
        } = props.coin

        if (id && name && image && market_cap_rank && symbol) {
          if (savedCoin.value) {
            savedCoin.value = false
            await updateDoc(coinPath, {
              watchList: arrayRemove({
                id,
                name,
                image,
                rank: market_cap_rank,
                symbol,
                current_price,
                total_volume,
                market_cap,
                price_change_percentage_24h
              })
            })
          } else {
            savedCoin.value = true
            await updateDoc(coinPath, {
              watchList: arrayUnion({
                id,
                name,
                image,
                rank: market_cap_rank,
                symbol,
                current_price,
                total_volume,
                market_cap,
                price_change_percentage_24h
              })
            })
          }
        } else {
          console.error('Invalid coin data')
        }
      } else {
        alert('Please sign in to save a coin to your watch list')
      }
    }

    const isSmallScreen = ref<boolean>(window.innerWidth < 768)

    onMounted(() => {
      checkIfCoinSaved()
    })

    return {
      savedCoin,
      saveOrDeleteCoin,
      isSmallScreen,
      isLoading
    }
  }
})
</script>

<template>
  <tr class="h-[80px] border-b overflow-hidden">
    <td v-if="isLoading">
      <span class="loading loading-spinner loading-sm mx-auto block"></span>
    </td>
    <td v-else @click="saveOrDeleteCoin" class="cursor-pointer">
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
      <SparkLine
        class="m-auto"
        :data="coin.sparkline_in_7d.price"
        :width="isSmallScreen ? 80 : 120"
        :height="isSmallScreen ? 20 : 30"
      />
    </td>
  </tr>
</template>
