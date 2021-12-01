<template>
  <div
    v-observe.once.-100px="setAnimate"
    :data-animate="animate"
    class="faqs max-w-screen-sm m-auto"
  >
    <h2 class="text-3xl text-center font-black text-gray-800 mb-6 leading-tight dark:text-gray-400">
      FAQs
    </h2>

    <div class="question pb-8">
      <h3 class="text-2xl mb-4 font-bold text-gray-700 leading-tight dark:text-gray-400">
        What is “the ratio”?
      </h3>
      <p>The ratio is the current price of ETH divided by the price of BTC and is used as a method of comparison between the value of both coins.</p>

      <p>If the price of ETH was equal to the price of BTC then the ratio would be <code>1.0</code>.</p>

      <p>Similarly if the price of ETH was half that of BTC then the ratio would be <code>0.5</code> etc., etc.</p>
    </div>

    <div class="question pb-8">
      <h3 class="text-2xl mb-4 font-bold text-gray-700 leading-tight dark:text-gray-400">
        What's up with the shrimp on the ratio meter?
      </h3>
      <p>
        The shrimp represents "Flippty Percent" which is a fun way of saying we're half way to "The Flippening".
      </p>
      <p>
        Back when this project was first created, back in the dark times below <code>0.03</code>, reaching 50% of The Flippening target was a notable milestone. Now it's just a historic marker on the meter and a helpful halfway marker.
      </p>
    </div>

    <div class="question">
      <h3 class="text-2xl mb-4 font-bold text-gray-700 leading-tight dark:text-gray-400">
        What‘s up with the dolphin emoji on the ratio meter?
      </h3>
      <p>The dolphin references “The Flippening” (where the total market cap of Ethereum is greater than that of Bitcoin). Currently that target is <code>{{ flippening }}</code> and reaching that ratio would indicate that the market sees both networks as being equal in value.</p>
      <p>I believe The Flippening is inevitable and is best understood by asking yourself:</p>
      <p class="italic font-bold text-lg">
        “is the Ethereum network - with everything it can do, everything that’s built on top of it, and all of the economic value it secures - seriously worth less than the single-purpose Bitcoin network?”
      </p>
      <p>
        For me that answer is an obvious “no way”. That means <em>if</em> BTC is priced correctly then anything less than <code>{{ flippening }}</code> on the ratio is a strong signal that Ethereum is currently undervalued.
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      animate: true
    }
  },
  computed: {
    ...mapGetters({
      flippening: 'markets/flippening',
      deserved: 'markets/deserved'
    })
  },
  methods: {
    setAnimate () {
      this.animate = true
    }
  }
}
</script>

<style lang="scss" scoped>
.faqs {
  transform: translateY(3em);
  opacity: 0;
  transition: all 0.33s ease-out;

  &[data-animate="true"] {
    transform: translateY(0);
    opacity: 1;
  }
}

.question {
  margin: 0 auto;

  p {
    @apply text-gray-600;
    @apply mb-4;
    @apply mx-auto;
    @apply dark:text-gray-500;
  }
}
</style>
