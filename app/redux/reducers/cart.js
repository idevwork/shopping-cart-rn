import actionTypes from '../actions'

const initialState = {
  productsInCart: {},
  promoCode: {},
  checkout: {}
}

const cart = (state = initialState, action) => {
  const productsInCart = { ...state.productsInCart }
  const id = action.sku
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      if (Object.prototype.hasOwnProperty.call(productsInCart, id))
        productsInCart[id] += 1
      else productsInCart[id] = 1
      return { ...state, productsInCart }
    case actionTypes.REMOVE_FROM_CART:
      productsInCart[id] -= 1
      if (productsInCart[id] === 0) delete productsInCart[id]
      return { ...state, productsInCart }
    case actionTypes.CLEAR_FROM_CART:
      if (Object.prototype.hasOwnProperty.call(productsInCart, id))
        delete productsInCart[id]
      return { ...state, productsInCart }
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
