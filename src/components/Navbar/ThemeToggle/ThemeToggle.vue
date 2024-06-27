<script lang="ts">
import { mapGetters, useStore } from 'vuex'
import { defineComponent } from 'vue'
import IconSun from '../../icons/IconSun.vue'
import IconMoon from '../../icons/IconMoon.vue'

export default defineComponent({
  name: 'ThemeToggle',
  components: {
    IconSun,
    IconMoon
  },
  computed: {
    ...mapGetters(['theme']),
    currentTheme(): string {
      return this.theme
    }
  },
  setup() {
    const store = useStore()

    const setLightTheme = () => {
      store.commit('setTheme', 'light')
    }

    const setDarkTheme = () => {
      store.commit('setTheme', 'dark')
    }
    return {
      setLightTheme,
      setDarkTheme
    }
  }
})
</script>

<template>
  <div class="p-2">
    <div class="flex items-center cursor-pointer" @click="toggleTheme">
      <template v-if="theme === 'dark'">
        <div @click="setLightTheme" class="flex w-full h-6">
          <IconMoon class="fill-primary mr-2 text-2xl" /> Light Mode
        </div>
      </template>
      <template v-else>
        <div @click="setDarkTheme" class="flex w-full h-6">
          <IconSun class="fill-primary mr-2 text-2xl" /> Dark Mode
        </div>
      </template>
    </div>
  </div>
</template>
