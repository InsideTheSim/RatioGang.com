<template>
  <div
    class="the-site-header mx-auto flex flex-col xs:flex-row items-center justify-center pb-2 pt-4 md:pt-8 px-2"
  >
    <div class="logo-container">
      <h1
        class="text-3xl md:text-4xl text-center font-black text-gray-800 dark:text-gray-300"
      >
        <span class="font-normal">🔵</span>&nbsp;DXInvestorDash&nbsp;<span class="font-normal cursor-pointer">🔵</span>
      </h1>
      <div
        v-show="showTagline && ratio"
        class="text-center text-gray-700 text-sm md:text-md dark:text-gray-400"
      >
        <p v-if="!ratio || ratio < 0.0425">Because seriously, what the fuck you guys.</p>
        <p v-else-if="ratio < 0.069">In retrospect, it was inevitable.</p>
        <p v-else-if="ratio < 0.07">Nice.</p>
        <p v-else-if="ratio < deserved">Mom! Get the camera!</p>
        <p v-else-if="ratio < 0.0825">Urge to Merge, baby!</p>
        <p v-else-if="ratio < 0.1">Approaching market rationality.</p>
        <p v-else-if="ratio < 0.145">Oh Lawd, he coming!</p>
        <p v-else-if="ratio < flippening">*Excited dolphin noises*</p>
        <p v-else-if="ratio < flippening + 0.01">FLIP! FLIP! FILPADELPHIA!</p>
        <p v-else-if="ratio < flippening + 0.03">Abandon <em>this</em>, Zhu.</p>
        <p v-else>We tried to tell you.</p>
      </div>
    </div>
    <div class="site-options flex-shrink-0 flex-grow ml-2 sm:ml-3 md:ml-8">
      <vSelect
        key="theme"
        v-model="$colorMode.preference"
        :reduce="(option) => option.id"
        :searchable="false"
        :options="[
          {
            id: 'system',
            label: '🌗 Auto',
          },
          {
            id: 'light',
            label: '☀️ Light',
          },
          {
            id: 'dark',
            label: '🌙 Dark',
          },
        ]"
        :clearable="false"
        :filterable="false"
      />
      <vSelect
        key="currency"
        v-model="selectedCurrency"
        :options="currencies"
        :searchable="false"
        :clearable="false"
        :filterable="false"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { currencies } from '~/libs/lists'

export default {
  data () {
    return {
      currencies,
      selectedCurrency: false
    }
  },
  computed: {
    ...mapGetters({
      userSelectedCurrency: 'markets/userSelectedCurrency',
      ratio: 'markets/ratio',
      deserved: 'markets/deserved',
      flippening: 'markets/flippening',
      confetti: 'system/confetti',
      wsPriceFeed: 'system/webSocketPriceFeed',
      fallbackPriceFeed: 'system/fallbackPriceFeed'
    }),
    showTagline () {
      return this.wsPriceFeed || this.fallbackPriceFeed
    },
    showFire () {
      return this.ratio >= this.deserved && this.ratio < 0.085
    }
  },
  watch: {
    selectedCurrency: {
      handler () {
        if (this.selectedCurrency) {
          this.$store.dispatch('markets/updateUserSelectedCurrency', {
            cookies: this.$cookies,
            data: this.selectedCurrency
          })
        }
      }
    },
    userSelectedCurrency: {
      immediate: true,
      handler () {
        if (
          !this.selectedCurrency ||
          this.selectedCurrency.id !== this.userSelectedCurrency.id
        ) {
          this.selectedCurrency = this.userSelectedCurrency
        }
      }
    }
  },
  methods: {
    handleEmojiClick () {
      if (this.showFire) {
        this.$store.commit('system/setConfetti', true)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.the-site-header {
  max-width: 500px;
}

.site-options {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 0.5em;
  padding-bottom: 0.25em;
  cursor: pointer;

  @media (min-width: 400px) {
    display: block;
    max-width: 75px;
    padding-top: 0.25em;
  }

  & > .v-select {
    width: 100%;
    max-width: 75px;

    &:first-child {
      margin-right: 0.5em;

      @media (min-width: 400px) {
        margin-right: 0;
        margin-bottom: 0.1em;
      }
    }
  }

  & ::v-deep .vs__dropdown-toggle {
    @apply dark:border-gray-600;
    padding-bottom: 0;
    cursor: pointer;
    min-height: 25px;
  }

  & ::v-deep .vs__search {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    overflow: hidden;
  }
  & ::v-deep .vs__actions {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    overflow: hidden;
  }
  & ::v-deep .vs__selected {
    @apply dark:text-gray-400;
    font-size: 0.75em;
    width: 100%;
    white-space: nowrap;
    margin: 0;
    padding: 0.25em;
    word-spacing: 0.33em;
    text-align: center;
    display: block;
  }
  & ::v-deep .vs__selected-options {
    width: 100%;
    text-align: center;
  }
  & ::v-deep .vs__open-indicator {
    display: none;
    @apply text-gray-400;
    @apply dark:text-gray-400;
    transform: scale(0.5);
    fill: currentColor;
  }
  & ::v-deep .vs__dropdown-menu {
    @apply dark:bg-gray-700;
    min-width: 75px;
    top: 100%;

    .vs__dropdown-option {
      @apply dark:text-gray-400;
      font-size: 0.85em;
      word-spacing: 0.33em;
      padding: 3px 5px;
    }
  }
}
</style>
