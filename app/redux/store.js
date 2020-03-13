import { createStore, applyMiddleware, compose } from 'redux'
import Reactotron from '../../ReactotronConfig'

import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'
import rootReducer from './reducers'

const sagaMonitor = Reactotron.createSagaMonitor()
const sagaMiddleware = createSagaMiddleware({ sagaMonitor })
const middleware = applyMiddleware(sagaMiddleware)
const store = createStore(
  rootReducer,
  compose(middleware, Reactotron.createEnhancer())
)

sagaMiddleware.run(rootSaga)

export default store
