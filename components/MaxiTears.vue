<template>
  <div class="m-auto py-16 text-center">
    <h2 class="text-2xl text-center font-black text-gray-800 mb-6 leading-tight dark:text-gray-400">
      Memorial to the Fallen&nbsp;Maxi
    </h2>
    <p
      class="text-gray-600 text-lg dark:text-gray-500"
    >
      “Muh flippening. The markets have proven you smug methheads wrong year over year. BTC is king. Eth will never be a store of value, (there's 20% more of it now since 2017), and the utility is dogshit--pay $20 to send your money or gamble on shitcoins.”
    </p>
    <p
      class="text-gray-700 pt-4 leading-tight dark:text-gray-400"
    >
      Reddit Troll - Jan 2nd, 2021<br><span class="text-sm text-gray-600 dark:text-gray-500">at <span class="text-gray-700 dark:text-gray-400">0.0231</span> ratio resulting in<span v-if="ratio > 0.025"><br><span class="text-red-600">{{ calcRatioGains(0.0231) }}%</span> in missed profits and</span><br> the inspiration to create this site.</span>
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { maxiTears } from '~/libs/lists'

export default {
  data () {
    return {
      animate: true,
      maxiTears
    }
  },
  computed: {
    ...mapGetters({
      ratio: 'markets/ratio'
    })
  },
  methods: {
    calcRatioGains (maxiRatio) {
      return (((this.ratio / maxiRatio) - 1) * 100).toFixed(2)
    },
    setAnimate () {
      this.animate = true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
