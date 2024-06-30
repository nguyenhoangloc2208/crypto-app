<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { useStore } from 'vuex'
import IconClose from '../icons/IconClose.vue'
import { RouterLink } from 'vue-router'

export default defineComponent({
  name: 'SavedCoin',
  components: {
    IconClose,
    RouterLink
  },
  setup() {
    const coins = ref<any[]>([])
    const store = useStore()
    const user = computed(() => store.getters['auth/user'])
    const isLoading = ref<boolean>(false)

    const fetchCoins = () => {
      isLoading.value = true
      let unsubscribe: () => void
      try {
        if (user.value?.email) {
          unsubscribe = onSnapshot(doc(db, 'users', user.value.email), (doc) => {
            coins.value = doc.data()?.watchList || []
            isLoading.value = false
          })
        } else {
          isLoading.value = false
        }
      } catch (e) {
        console.log(e.message)
        isLoading.value = false
      }
      return unsubscribe
    }

    const coinPath = computed(() => doc(db, 'users', user.value?.email || ''))

    const deleteCoin = async (passedId: string) => {
      try {
        const result = coins.value.filter((item) => item.id !== passedId)
        await updateDoc(coinPath.value, {
          watchList: result
        })
      } catch (e) {
        console.log(e.message)
      }
    }

    onMounted(() => {
      const unsubscribe = fetchCoins()
      return () => {
        unsubscribe?.()
      }
    })

    return {
      coins,
      deleteCoin,
      isLoading
    }
  }
})
</script>

<template>
  <div>
    <div v-if="isLoading">
      <span class="loading loading-dots loading-sm block"></span>
    </div>
    <table v-else-if="coins.length > 0" class="w-full border-collapse text-center">
      <thead>
        <tr class="border-b">
          <th class="px-4">Rank #</th>
          <th class="text-left">Coin</th>
          <th>Price</th>
          <th>24h</th>
          <th class="hidden md:table-cell">24h Volume</th>
          <th class="hidden sm:table-cell">Mkt</th>
          <th class="text-left">Remove</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="coin in coins" :key="coin.id" class="h-[60px] overflow-hidden">
          <td>{{ coin.rank }}</td>
          <td>
            <RouterLink :to="`/coin/${coin.id}`">
              <div class="flex items-center">
                <img :src="coin.image" class="w-8 mr-4" alt="/" />
                <div>
                  <p class="hidden sm:table-cell">{{ coin.name }}</p>
                  <p class="text-gray-500 text-left text-sm">{{ coin.symbol.toUpperCase() }}</p>
                </div>
              </div>
            </RouterLink>
          </td>
          <td>${{ coin.current_price.toLocaleString() }}</td>
          <td>
            <p :class="coin.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600'">
              {{ coin.price_change_percentage_24h.toFixed(2) }}%
            </p>
          </td>
          <td class="w-[180px] hidden md:table-cell">${{ coin.total_volume.toLocaleString() }}</td>
          <td class="w-[180px] hidden sm:table-cell">${{ coin.market_cap.toLocaleString() }}</td>
          <td class="pl-8">
            <IconClose @click="deleteCoin(coin.id)" class="cursor-pointer" />
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else-if="coins.length === 0">
      You don't have any coins saved. Please save a coin to add it to your watch list.
      <RouterLink class="text-accent" to="/">Click here to search coins.</RouterLink>
    </p>
  </div>
</template>
