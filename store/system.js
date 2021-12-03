const state = () => ({
  confetti: false,
  fallbackPriceFeed: false,
  webSocketPriceFeed: false,
  showDonationBanner: true
})

/**
 * Getters for the object, these are like computed properties.
 *
 * @type {Object}
 */
const getters = {
  confetti (state) {
    return state.confetti
  },
  fallbackPriceFeed (state) {
    return state.fallbackPriceFeed
  },
  webSocketPriceFeed (state) {
    return state.webSocketPriceFeed
  },
  showDonationBanner (state) {
    return state.showDonationBanner
  }
}

/**
 * Actions for this module. This is where all async should take place.
 *
 * @type {Object}
 */
const actions = {
  hideDonationBanner ({ commit }, cookies) {
    cookies.set('ratiogang-hide-banner', true, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365
    })
    commit('setShowDonationBanner', false)
  }
}

/**
 * List of all possible mutators, these need to be pure functions.
 *
 * @type {Object}
 */
const mutations = {
  setConfetti (state, payload) {
    state.confetti = payload
  },
  setFallbackPriceFeed (state, payload) {
    state.fallbackPriceFeed = payload
  },
  setWebSocketPriceFeed (state, payload) {
    state.webSocketPriceFeed = payload
  },
  setShowDonationBanner (state, payload) {
    state.showDonationBanner = payload
  }
}

/**
 * Finally we export the module for our store to use (see ../index.js)
 */
export default {
  state,
  getters,
  actions,
  mutations
}
