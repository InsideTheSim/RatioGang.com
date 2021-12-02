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
      coinbaseWSS: false,
      createPriceFeedInterval: false,
      attemptedCoinbaseConnection: 0,
      coinbaseMessageCount: 0
    }
  },
  computed: {
    ...mapGetters({
      userSelectedCurrency: 'markets/userSelectedCurrency',
      wsPriceFeed: 'system/webSocketPriceFeed',
      fallbackPriceFeed: 'system/fallbackPriceFeed'
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
    this.createPriceFeedInterval = setInterval(() => {
      if (!this.coinbaseWSS && this.attemptedCoinbaseConnection < 12 && !this.fallbackPriceFeed) {
        this.$store.commit('system/setFallbackPriceFeed', true)
        this.setupCoinGecko()
        this.createPriceFeed()
      } else {
        clearInterval(this.createPriceFeedInterval)
      }
    }, 4000)

    this.createPriceFeed()
  },
  methods: {
    createPriceFeed () {
      this.attemptedCoinbaseConnection = this.attemptedCoinbaseConnection + 1

      if (
        !this.coinbaseWSS &&
        this.userSelectedCurrency &&
        ['usd', 'eur', 'gbp'].includes(this.userSelectedCurrency.id)
      ) {
        this.coinbaseWSS = new WebSocket('wss://ws-feed.pro.coinbase.com')
        this.coinbaseWSS.onopen = () => {
          // request coinbase feeds
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
        this.coinbaseWSS.onmessage = (msg) => {
          const data = JSON.parse(msg.data)
          if (data.type === 'ticker') {
            this.handleCoinbaseConnected()
            this.$store.commit('markets/setPrices', data)
          }
        }
      }
    },
    handleCoinbaseConnected () {
      this.coinbaseMessageCount++
      if (!this.wsPriceFeed && this.createPriceFeedInterval) {
        clearInterval(this.createPriceFeedInterval)
      }
      // collect enough messages to get good starting data
      if (this.coinbaseMessageCount === 8) {
        // set up coingecko for extra data
        this.setupCoinGecko()
        this.$store.commit('system/setWebSocketPriceFeed', true)

        // replace onmessage with slower throttle
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
    },
    async fetchCoinGecko () {
      await this.$store.dispatch('markets/fetchCoinGecko', this.$cookies)
    },
    async setupCoinGecko () {
      this.restoreUserPreferredCurrency()
      if (!this.coinGecko) {
        await this.fetchCoinGecko()
      }
      setInterval(async () => {
        await this.fetchCoinGecko()
      }, 60 * 1000)
    },
    async restoreUserPreferredCurrency () {
      await this.$store.dispatch('markets/restoreUserPreferredCurrency', this.$cookies)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
