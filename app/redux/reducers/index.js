import { combineReducers } from 'redux'
import product from './productReducer'
import cart from './cartReducer'

const rootReducer = combineReducers({
  product,
  cart
})

export default rootReducer
