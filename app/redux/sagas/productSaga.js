import { call, put, takeEvery } from 'redux-saga/effects'
import { actionTypes } from '../reducers/product'
import { fetchProducts } from '../../service/products'

function* fetchProductsSaga() {
  const { data } = yield call(fetchProducts)
  yield put({
    type: actionTypes.fetchProductsSucceed,
    products: data
  })
}

export function* fetchProductsWatcher() {
  yield takeEvery(actionTypes.fetchProductsRequest, fetchProductsSaga)
}
