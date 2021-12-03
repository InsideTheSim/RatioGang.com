<template>
  <div class="gitcoin-grants-alert text-gray-600 dark:text-gray-500">
    <div class="message">
      <span class="headline text-center font-black text-gray-800 dark:text-gray-300">
        <span class="font-normal">💪</span>RatioGang<span class="font-normal">📈</span> is a qualifying project in the current GR12 round of Gitcoin Grants.<br>
        <small>Dec 1st - Dec 16th</small>
      </span>
      <span class="copy">
        A <strong class="text-blue-500 dark:text-blue-300">$1</strong> donation will result in approximately a <strong class="text-blue-500 dark:text-blue-300">$100</strong> match from the
        quadratic funding pool. If you have enjoyed this project your consideration is greatly appreciated.
        RatioGang has been and shall remain a free, ad-free, and open-source project.
      </span>
    </div>
    <div class="options">
      <div class="flex align-center justify-center mb-4 mt-4">
        <div class="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4">
          <a target="_blank" rel="nofollow noopener" href="https://gitcoin.co/grants/2239/ratiogangcom"><span class="font-normal">💪</span> Donate</a>
        </div>
        <div
          class="cursor-pointer bg-transparent hover:bg-blue-600 text-blue-500 dark:text-gray-200 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          @click="hideBanner"
        >
          Hide
        </div>
      </div>
      <div class="notice text-xs text-center text-gray-400 dark:text-gray-500">Upon hiding a cookie will be saved to your device and you <strong>will not</strong> be shown this message again.<br>Thank you for your patronage.❤️</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    hideBanner () {
      this.$store.dispatch('system/hideDonationBanner', this.$cookies)
    }
  }
}
</script>

<style lang="scss" scoped>
.gitcoin-grants-alert {
  @apply shadow-md;
  @apply bg-white;
  margin: auto;
  width: 98%;
  max-width: 620px;
  padding: 2em;
  border-radius: 12px;

  .dark & {
    @apply bg-gray-700;
  }
}

.headline {
  display: block;
  font-size: 1.5em;
  margin-bottom: 1em;
  font-weight: bold;
  text-align: center;
  line-height: 1.2;

  small {
    display: block;
    text-align: center;
    font-size: 1rem;
    margin-top: 0.5em;
  }
}

.copy {
  @apply text-gray-600;
  @apply mb-4;
  @apply mx-auto;
  @apply dark:text-gray-300;
}

.notice {

}
</style>
