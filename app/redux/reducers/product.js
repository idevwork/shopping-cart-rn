import { createAction, handleActions } from 'redux-actions'

const defaultState = []

export const actionTypes = {
  fetchProductsRequest: 'PRODUCT/FETCH_PRODUCTS_REQUEST',
  fetchProductsSucceed: 'PRODUCT/FETCH_PRODUCTS_SUCCEED',
  fetchProductsFail: 'PRODUCT/FETCH_PRODUCTS_FAIL'
}

export const fetchProductsRequest = createAction(
  actionTypes.fetchProductsRequest
)

export default handleActions(
  {
    [actionTypes.fetchProductsSucceed]: (state, action) => action.products
  },
  defaultState
)
