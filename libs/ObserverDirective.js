import ObserverRegistry from 'observer-registry'

const registry = new ObserverRegistry()

/**
 * Curry a callback that applies an attribute to the element and then calls the
 * respective callback (if applicable).
 * @param {Element} el
 * @param {String} attribute
 * @param {Function} callback
 */
function attributeApplicator (el, attribute, callback) {
  return (value) => {
    value ? el.setAttribute(attribute, true) : el.removeAttribute(attribute)
    if (callback) {
      setTimeout(() => {
        callback(value)
      }, 50)
    }
  }
}

/**
 * Given an array of strings, extract any numeric values, these are the margins
 * of our IntersectionObserver.
 * @param {Array} modifiers
 */
function rootMargin (modifiers) {
  const isUnit = /^-?\d+(px|%)$/
  const margins = modifiers
    .filter(m => isUnit.test(m))
  return margins.length ? margins.join(' ') : false
}

/**
 * Apply a directive on an element to the ObserverRegistry.
 * @param {Element} el
 * @param {Object} data
 */
function applyDirective (el, { value, modifiers, arg }) {
  value = arg ? attributeApplicator(el, arg, value) : value
  const margins = rootMargin(Object.keys(modifiers))
  if (typeof value === 'function') {
    registry.addElement(el, value, Object.assign({},
      modifiers.once ? { once: true } : {},
      margins ? { rootMargin: margins } : {}
    ))
  } else if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line
    console.warn(`v-observe directive expects a callback or argument to use as an attribute, ${typeof value} given. `, el)
  }
}

/**
 * Remove an element to the ObserverRegistry.
 * @param {Element} el
 */
function unbind (el) {
  registry.removeElement(el)
}

export default {
  bind: applyDirective,
  unbind
}
