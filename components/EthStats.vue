<template>
  <div class="eth-stats max-w-screen-sm m-auto">
    <table class="table-fixed">
      <thead>
        <tr>
          <td colspan="2" class="text-center leading-md">Ethereum Statistics <small>(Last Update: {{ lastUpdated }})</small></td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="w-1/2"><strong>Cost of Ethereum PoS Validator</strong></td>
          <td class="w-1/2">{{ nodeCost }}</td>
        </tr>
        <tr>
          <td class="w-1/2"><strong>Ethereum Circulating Supply</strong></td>
          <td class="w-1/2">{{ ethCirculatingSupply }}</td>
        </tr>
        <tr>
          <td class="w-1/2"><strong>All Time High (ATH)</strong></td>
          <td class="w-1/2">{{ allTimeHigh }}</td>
        </tr>
        <tr>
          <td class="w-1/2"><strong>Percentage from ATH</strong></td>
          <td class="w-1/2">{{ percentageFromAllTimeHigh }}</td>
        </tr>
        <tr>
          <td class="w-1/2"><strong>Days since ATH</strong></td>
          <td class="w-1/2">{{ daysSinceAllTimeHigh }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { mapGetters } from 'vuex'
import { formatPrice } from '~/libs/utils'

dayjs.extend(relativeTime)

export default {
  computed: {
    ...mapGetters({
      eth: 'markets/eth',
      userSelectedCurrency: 'markets/userSelectedCurrency'
    }),
    nodeCost () {
      return this.eth ? formatPrice(this.eth.current_price * 32, this.userSelectedCurrency.format, this.userSelectedCurrency.id) : false
    },
    allTimeHigh () {
      return this.eth ? formatPrice(this.eth.ath, this.userSelectedCurrency.format, this.userSelectedCurrency.id) : false
    },
    daysSinceAllTimeHigh () {
      if (this.eth) {
        const athDate = dayjs(this.eth.ath_date)
        return dayjs().diff(athDate, 'day').toLocaleString(
          this.userSelectedCurrency.format,
          { maximumFractionDigits: 0 }
        )
      }
      return false
    },
    percentageFromAllTimeHigh () {
      return this.eth ? `${this.eth.ath_change_percentage.toFixed(2)}%` : false
    },
    ethCirculatingSupply () {
      if (this.eth) {
        return this.eth.circulating_supply.toLocaleString(
          this.userSelectedCurrency.format,
          { maximumFractionDigits: 0 }
        )
      }
      return false
    },
    lastUpdated () {
      if (this.eth) {
        return dayjs(this.eth.last_updated).fromNow()
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.eth-stats {
  width: 100%;

  table {
    @apply bg-white;
    @apply shadow-sm;
    width: 100%;
    border-collapse: collapse;
    overflow: hidden;
    border-radius: 12px;

    .dark & {
      @apply bg-gray-700;
    }
  }

  thead {
    @apply text-lg;
    font-weight: bold;

    td {
      @apply text-gray-900;

      .dark & {
        @apply text-gray-400;
      }
    }

    small {
      display: inline-block;
      position: relative;
      font-size: 0.66em;
      opacity: 0.5;
      margin-left: 1em;
      margin-right: 1em;
      top: -0.25em;
    }
  }

  td {
    @apply border;
    @apply border-blue-100;
    @apply text-blue-900;
    padding: 0.5em 1em;
    font-size: 0.9em;

    .dark & {
      @apply border-gray-900;
      @apply text-gray-300;
    }

    strong {
      font-weight: normal;
      @apply text-gray-800;

      .dark & {
        @apply text-gray-400;
      }
    }
  }
}
</style>
