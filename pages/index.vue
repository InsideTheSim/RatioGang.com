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
import { throttle } from '~/libs/utils'

export default {
  data () {
    return {
      prices: false,
      coinbaseWSS: false
    }
  },
  computed: {
    ...mapGetters({
      userSelectedCurrency: 'markets/userSelectedCurrency'
    })
  },
  watch: {
    async userSelectedCurrency (newer, older) {
      if (newer.id !== older.id) {
        this.$store.commit('markets/resetPrices')
        if (this.coinbaseWSS) {
          await this.coinbaseWSS.close()
          this.coinbaseWSS = false
        }
        this.createPriceFeed()
      }
    }
  },
  mounted () {
    this.createPriceFeed()
  },
  methods: {
    createPriceFeed () {
      if (
        !this.coinbaseWSS &&
        this.userSelectedCurrency &&
        ['usd', 'eur', 'gbp'].includes(this.userSelectedCurrency.id)
      ) {
        this.coinbaseWSS = new WebSocket('wss://ws-feed.pro.coinbase.com')
        this.coinbaseWSS.onopen = () => {
          this.$store.commit('markets/setWebSocketPriceFeed', true)
          this.coinbaseWSS.send(JSON.stringify(
            {
              type: 'subscribe',
              product_ids: [
                `ETH-${this.userSelectedCurrency.id.toUpperCase()}`,
                `BTC-${this.userSelectedCurrency.id.toUpperCase()}`
              ],
              channels: [
                'ticker'
              ]
            }
          ))
        }
        this.coinbaseWSS.onmessage = throttle(
          (msg) => {
            const data = JSON.parse(msg.data)
            if (data.type === 'ticker') {
              this.$store.commit('markets/setPrices', data)
            }
          },
          1000
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
