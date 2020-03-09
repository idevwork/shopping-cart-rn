import { all } from 'redux-saga/effects'
import { applyPromoCodeWatcher, checkoutWatcher } from './cartSaga'
import { fetchProductsWatcher } from './productSaga'

export default function* rootSaga() {
  yield all([
    applyPromoCodeWatcher(),
    checkoutWatcher(),
    fetchProductsWatcher()
  ])
}
