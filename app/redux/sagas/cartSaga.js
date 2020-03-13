import { select, call, put, takeEvery } from 'redux-saga/effects'
import { actionTypes } from '../reducers/cart'
import { applyPromoCode, checkout } from '../../service/cart'
import config from '../../service/config'
import { getBasket } from '../../selectors'

function* applyPromoCodeSaga(action) {
  try {
    const { data: payload } = yield call(applyPromoCode, action.payload)
    yield put({
      type: actionTypes.applyPromoCodeSucceed,
      payload
    })
  } catch (error) {
    console.log(`promoCode: ${error}`)
  }
}

export function* applyPromoCodeWatcher() {
  yield takeEvery(actionTypes.applyPromoCodeRequest, applyPromoCodeSaga)
}

function* checkoutSaga() {
  try {
    const { cardNumber } = config
    const basket = yield select(getBasket)
    const { data } = yield call(checkout, {
      basket,
      cardNumber
    })
    yield put({
      type: actionTypes.checkoutSucceed,
      payload: data.errors ? data.errors[0] : data
    })
  } catch (error) {
    console.log(`checkout: ${error}`)
  }
}

export function* checkoutWatcher() {
  yield takeEvery(actionTypes.checkoutRequest, checkoutSaga)
}
