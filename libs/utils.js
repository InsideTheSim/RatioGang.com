export function formatPrice (price, locale = 'en-US', currency = 'usd') {
  const parsedPrice = parseFloat(price)
  if (typeof parsedPrice === 'number') {
    return parsedPrice.toLocaleString(locale, {
      style: 'currency',
      currency
    })
  }
  return price
}
