import actionTypes from '../actions'

const initialState = {
  productsInCart: {},
  promoCode: {},
  checkout: {}
}

const handleProductsInCart = (state, productId, mode) => {
  const productsInCart = { ...state.productsInCart }
  if (Object.prototype.hasOwnProperty.call(productsInCart, productId)) {
    switch (mode) {
      case 'add':
        productsInCart[productId] += 1
        break
      case 'remove':
        productsInCart[productId] -= 1
        break
      case 'clear':
        delete productsInCart[productId]
        break
    }
    if (productsInCart[productId] === 0) delete productsInCart[productId]
  } else productsInCart[productId] = 1

  return { ...state, productsInCart }
}

const cart = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      return handleProductsInCart(state, action.sku, 'add')
    case actionTypes.REMOVE_FROM_CART:
      return handleProductsInCart(state, action.sku, 'remove')
    case actionTypes.CLEAR_FROM_CART:
      return handleProductsInCart(state, action.sku, 'clear')
    case actionTypes.CHECKOUT_SUCCEED:
      return { ...state, checkout: action.response }
    case actionTypes.CART_RESET:
      return {
        ...state,
        productsInCart: {},
        checkout: {}
      }
    case actionTypes.APPLY_PROMO_CODE_SUCCEED:
      return { ...state, promoCode: action.response }
    default:
      return state
  }
}

export default cart
