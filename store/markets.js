import CoinGecko from 'coingecko-api'
import { currencies } from '~/libs/lists'
import { formatPrice } from '~/libs/utils'

const state = () => ({
  coinGecko: false,
  prices: {},
  userSelectedCurrency: false
})

/**
 * Getters for the object, these are like computed properties.
 *
 * @type {Object}
 */
const getters = {
  coinGecko (state) {
    return state.coinGecko
  },
  prices (state) {
    if (state.prices.eth && state.prices.btc) {
      return state.prices
    }
    return false
  },
  max (state) {
    return state.max
  },
  userSelectedCurrency (state) {
    return state.userSelectedCurrency || currencies[0]
  },
  eth (state, getters) {
    if (['usd', 'eur', 'gbp'].includes(getters.userSelectedCurrency.id)) {
      if (getters.prices && getters.coinGecko) {
        const eth = getters.coinGecko.find(item => item.id === 'ethereum')
        return Object.assign({}, eth, {
          current_price: getters.prices.eth
        })
      }
    }
    if (getters.coinGecko) {
      return getters.coinGecko.find(item => item.id === 'ethereum')
    }
    return false
  },
  eth24hPercentChange (state, getters) {
    if (getters.coinGecko && getters.eth) {
      return getters.eth.price_change_percentage_24h.toFixed(2)
    }
    return 0
  },
  btc (state, getters) {
    if (['usd', 'eur', 'gbp'].includes(getters.userSelectedCurrency.id)) {
      if (getters.prices && getters.coinGecko) {
        const btc = getters.coinGecko.find(item => item.id === 'bitcoin')
        return Object.assign({}, btc, {
          current_price: getters.prices.btc
        })
      }
    }
    if (getters.coinGecko) {
      return getters.coinGecko.find(item => item.id === 'bitcoin')
    }
    return false
  },
  btc24hPercentChange (state, getters) {
    if (getters.coinGecko && getters.btc) {
      return getters.btc.price_change_percentage_24h.toFixed(2)
    }
    return 0
  },
  ratio (state, getters) {
    if (getters.eth && getters.btc) {
      return (getters.eth.current_price / getters.btc.current_price).toFixed(6)
    }
    return 0
  },
  ratioDollars (state, getters) {
    if (getters.eth) {
      return formatPrice(
        getters.eth.current_price,
        getters.userSelectedCurrency.format,
        getters.userSelectedCurrency.id
      )
    }
    return 0
  },
  ratioPercent (state, getters) {
    if (getters.ratio && getters.flippening) {
      return ((getters.ratio / getters.flippening) * 100).toFixed(2)
    }
    return 0
  },
  flippening (state, getters) {
    if (getters.eth && getters.btc) {
      return (getters.btc.circulating_supply / getters.eth.circulating_supply).toFixed(5)
    }
    return 0
  },
  deserved (state, getters) {
    if (getters.flippening) {
      return (getters.flippening / 2).toFixed(5)
    }
    return '0.75'
  },
  deservedDollars (state, getters) {
    if (getters.eth) {
      return formatPrice(
        ((getters.deserved / getters.ratio) * getters.eth.current_price),
        getters.userSelectedCurrency.format,
        getters.userSelectedCurrency.id
      )
    }
    return 0
  },
  targetDollars (state, getters) {
    if (getters.eth && getters.flippening) {
      return formatPrice(
        ((getters.flippening / getters.ratio) * getters.eth.current_price),
        getters.userSelectedCurrency.format,
        getters.userSelectedCurrency.id
      )
    }
    return 0
  },
  targetDollars2x (state, getters) {
    if (getters.eth && getters.flippening) {
      return formatPrice(
        (((getters.flippening * 2) / getters.ratio) * getters.eth.current_price),
        getters.userSelectedCurrency.format,
        getters.userSelectedCurrency.id
      )
    }
    return 0
  },
  targetDollars3x (state, getters) {
    if (getters.eth && getters.flippening) {
      return formatPrice(
        (((getters.flippening * 3) / getters.ratio) * getters.eth.current_price),
        getters.userSelectedCurrency.format,
        getters.userSelectedCurrency.id
      )
    }
    return 0
  },
  targetDollars4x (state, getters) {
    if (getters.eth && getters.flippening) {
      return formatPrice(
        (((getters.flippening * 4) / getters.ratio) * getters.eth.current_price),
        getters.userSelectedCurrency.format,
        getters.userSelectedCurrency.id
      )
    }
    return 0
  }
}

/**
 * Actions for this module. This is where all async should take place.
 *
 * @type {Object}
 */
const actions = {
  async restoreUserPreferredCurrency ({ state, commit }, cookies) {
    const userStoredCurrency = cookies ? await cookies.get('ratiogang-currency') : state.userSelectedCurrency
    const currency = userStoredCurrency || currencies[0]
    if (userStoredCurrency) {
      commit('setUserSelectedCurrency', currency)
    }
  },
  async fetchCoinGecko ({ state, commit }, cookies) {
    const coinGecko = new CoinGecko()
    const markets = await coinGecko.coins.markets({
      ids: ['bitcoin', 'ethereum'],
      vs_currency: state.userSelectedCurrency.id
    })
    commit('setCoinGeckoData', markets.data)
  },
  updateUserSelectedCurrency ({ commit, dispatch }, { cookies, data }) {
    cookies.set('ratiogang-currency', data, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365
    })
    commit('setUserSelectedCurrency', data)
  }
}

/**
 * List of all possible mutators, these need to be pure functions.
 *
 * @type {Object}
 */
const mutations = {
  setCoinGecko (state, payload) {
    state.coinGecko = payload
  },
  setCoinGeckoData (state, payload) {
    state.coinGecko = payload
  },
  setPrices (state, payload) {
    let price = {}
    if (payload.product_id.startsWith('ETH')) {
      price = {
        eth: payload.price
      }
    } else if (payload.product_id.startsWith('BTC')) {
      price = {
        btc: payload.price
      }
    }
    state.prices = Object.assign({}, state.prices, price)
  },
  resetPrices (state) {
    state.prices = {}
  },
  setUserSelectedCurrency (state, payload) {
    state.userSelectedCurrency = payload
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
