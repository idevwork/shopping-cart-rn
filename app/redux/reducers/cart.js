import actionTypes from '../actions'

const initialState = {
  selectedProducts: {},
  promoCode: {}
}

const handleCartEvent = (selectedProducts, sku, value) => {
  if (Object.prototype.hasOwnProperty.call(selectedProducts, sku)) {
    value === 0 ? (selectedProducts[sku] = 0) : (selectedProducts[sku] += value)
    if (selectedProducts[sku] === 0) delete selectedProducts[sku]
  } else selectedProducts[sku] = 1

  return { ...selectedProducts }
}

const cart = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      return {
        ...state,
        selectedProducts: handleCartEvent(state.selectedProducts, action.sku, 1)
      }
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        selectedProducts: handleCartEvent(state.selectedProducts, action.sku, -1)
      }
    case actionTypes.CLEAR_CART:
      return {
        ...state,
        selectedProducts: handleCartEvent(state.selectedProducts, action.sku, 0)
      }
    case actionTypes.CHECKOUT_SUCCEED:
      return { ...state, checkout: action.response }
    case actionTypes.CART_RESET:
      return {
        ...state,
        checkout: undefined
      }
    case actionTypes.APPLY_PROMO_CODE_SUCCEED:
      return { ...state, promoCode: action.response }
    default:
      return state
  }
}

export default cart
