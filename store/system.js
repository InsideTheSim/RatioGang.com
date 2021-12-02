const state = () => ({
  confetti: false,
  fallbackPriceFeed: false,
  webSocketPriceFeed: false
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
  }
}

/**
 * Actions for this module. This is where all async should take place.
 *
 * @type {Object}
 */
const actions = {
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
