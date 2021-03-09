export function formatPrice (price, locale = 'en-US', currency = 'usd') {
  if (typeof price === 'number') {
    return price.toLocaleString(locale, {
      style: 'currency',
      currency
    })
  }
  return price
}
