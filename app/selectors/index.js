import { createSelector } from 'reselect'

export const getProducts = (state) => state.product
export const getProductsInCart = (state) => state.cart.productsInCart

export const getProductsQuantityInCart = (state) =>
  Object.values(state.cart.productsInCart).reduce((acc, cur) => acc + cur, 0)

export const getProductsDetailInCart = createSelector(
  getProductsInCart,
  getProducts,
  (productsInCart, products) => {
    return Object.keys(productsInCart).map((selectedId) => ({
      ...products.find((product) => selectedId === product.sku.toString()),
      quantity: productsInCart[selectedId]
    }))
  }
)

export const getBasket = (state) => {
  const productsInCart = getProductsInCart(state)
  return Object.keys(productsInCart).map((el) => ({
    sku: el,
    quantity: productsInCart[el]
  }))
}

export const getTotalPrice = createSelector(
  getProductsInCart,
  getProducts,
  (productsInCart, products) =>
    Object.keys(productsInCart)
      .reduce((acc, cur) => {
        const price =
          products.find((product) => product.sku.toString() === cur).price || 0
        return acc + price * productsInCart[cur]
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
  const subTotal = getTotalPrice(state)
  const promoAmount = getDiscountedPrice(state, subTotal)
  const basketTotal = (subTotal - promoAmount).toFixed(2)
  return { subTotal, promoAmount, basketTotal }
}
