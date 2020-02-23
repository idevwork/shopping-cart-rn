import { createSelector } from 'reselect'

export const getProducts = (state) => state.product
export const getSelectedProducts = (state) => state.cart.selectedProducts

export const getSelectedProductsCnt = (state) =>
  Object.values(state.cart.selectedProducts).reduce((acc, cur) => acc + cur, 0)

export const getSelectedProductsDetail = createSelector(
  getSelectedProducts,
  getProducts,
  (selectedProducts, products) => {
    return Object.keys(selectedProducts).map((selectedId) => ({
      ...products.find((product) => selectedId === product.sku.toString()),
      cnt: selectedProducts[selectedId]
    }))
  }
)

export const getTotalPriceOfCartItems = createSelector(
  getSelectedProducts,
  getProducts,
  (selectedProducts, products) =>
    Object.keys(selectedProducts)
      .reduce((acc, cur) => {
        const price = products.find((product) => product.sku.toString() === cur).price || 0
        return acc + price * selectedProducts[cur]
      }, 0)
      .toFixed(2)
)

export const getDiscountedPrice = (state, subTotal) => {
  const { discounttype, amount } = state.cart.promoCode
  if (discounttype === 'percent') {
    return (subTotal / amount).toFixed(2)
  } else {
    return 0
  }
}

export const getPrices = (state) => {
  const subTotal = getTotalPriceOfCartItems(state)
  const promoAmount = getDiscountedPrice(state, subTotal)
  const basketTotal = (subTotal - promoAmount).toFixed(2)
  return { subTotal, promoAmount, basketTotal }
}
