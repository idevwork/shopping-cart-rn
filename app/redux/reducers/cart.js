import { createAction, handleActions } from 'redux-actions'

const defaultState = {
  productsInCart: {},
  promoCode: {},
  checkout: {}
}

export const actionTypes = {
  addToCart: 'CART/ADD_TO_CART',
  removeFromCart: 'CART/REMOVE_FROM_CART',
  clearFromCart: 'CART/CLEAR_FROM_CART',

  applyPromoCodeRequest: 'CART/APPLY_PROMO_CODE_REQUEST',
  applyPromoCodeSucceed: 'CART/APPLY_PROMO_CODE_SUCCEED',

  checkoutRequest: 'CART/CHECKOUT_REQUEST',
  checkoutSucceed: 'CART/CHECKOUT_SUCCEED',

  cartReset: 'CART_RESET'
}

export const addToCart = createAction(actionTypes.addToCart)
export const removeFromCart = createAction(actionTypes.removeFromCart)
export const clearFromCart = createAction(actionTypes.clearFromCart)

export const applyPromoCodeRequest = createAction(
  actionTypes.applyPromoCodeRequest
)

export const checkoutRequest = createAction(actionTypes.checkoutRequest)

export const cartReset = createAction(actionTypes.cartReset)

export default handleActions(
  {
    [actionTypes.addToCart]: (state, action) => {
      const id = action.payload
      const quantity = state.productsInCart[id] || 0
      return {
        ...state,
        productsInCart: { ...state.productsInCart, [id]: quantity + 1 }
      }
    },
    [actionTypes.removeFromCart]: (state, action) => {
      const productsInCart = { ...state.productsInCart }
      const id = action.payload
      productsInCart[id] -= 1
      if (productsInCart[id] === 0) {
        delete productsInCart[id]
      }
      return { ...state, productsInCart }
    },
    [actionTypes.clearFromCart]: (state, action) => {
      const productsInCart = { ...state.productsInCart }
      const id = action.payload
      if (productsInCart[id]) {
        delete productsInCart[id]
      }
      return { ...state, productsInCart }
    },
    [actionTypes.applyPromoCodeSucceed]: (state, action) => ({
      ...state,
      promoCode: action.payload
    }),
    [actionTypes.checkoutSucceed]: (state, action) => ({
      ...state,
      checkout: action.payload
    }),
    [actionTypes.cartReset]: (state) => ({
      ...state,
      productsInCart: {},
      checkout: {}
    })
  },
  defaultState
)
