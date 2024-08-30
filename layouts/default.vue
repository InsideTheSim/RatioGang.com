<template>
  <div class="layout-container flex flex-col bg-blue-50 dark:bg-gray-800">
    <TheSiteHeader />
    <div v-show="loaded" class="page-content">
      <PriceStats />
      <Nuxt />
      <TheSiteFooter />
    </div>
    <div class="mb-auto mt-32 text-center" v-show="!loaded">
      <h2 class="text-2xl md:text-3xl text-gray-800 dark:text-gray-300">
        loading...
      </h2>
      <span class="text-4xl flipper">🐬</span>
    </div>
    <EasterEgg />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      wsPriceFeed: 'system/webSocketPriceFeed',
      fallbackPriceFeed: 'system/fallbackPriceFeed',
    }),
    loaded() {
      return !!this.wsPriceFeed || !!this.fallbackPriceFeed;
    },
  },
};
</script>

<style lang="scss" scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}

.layout-container {
  min-height: 100vh;
}
.flipper {
  display: block;
  animation: 1s infinite spin;
}
</style>
