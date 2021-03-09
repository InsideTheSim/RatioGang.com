<template>
  <div class="px-4 py-2 flex-1 flex flex-col overflow-x-hidden">
    <div class="container">
      <RatioMeter />
    </div>
    <div class="mb-8">
      <div class="container pt-24 pb-8">
        <EthStats />
      </div>
    </div>
    <div class="container pb-16">
      <FrequentlyAskedQuestions />
    </div>
    <div class="mb-16 mt-8 mx-auto max-w-screen-sm">
      <div class="maxi-tears container bg-blue-100 rounded-xl px-4 md:px-8 lg:px-16 dark:bg-gray-700">
        <MaxiTears />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      prices: false
    }
  },
  computed: {
    ...mapGetters({
      userSelectedCurrency: 'markets/userSelectedCurrency'
    })
  },
  watch: {
    userSelectedCurrency () {
      this.createPriceFeed()
    }
  },
  mounted () {
    this.createPriceFeed()
  },
  methods: {
    createPriceFeed () {
      if (!this.prices && this.userSelectedCurrency && this.userSelectedCurrency.id === 'usd') {
        this.prices = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum')
        this.prices.onmessage = (msg) => {
          this.$store.commit('markets/setPrices', JSON.parse(msg.data))
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
