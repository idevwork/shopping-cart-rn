import { all } from 'redux-saga/effects'
import { fetchProductsWatcher } from './productSagas'

export default function* rootSaga() {
  yield all([fetchProductsWatcher()])
}
