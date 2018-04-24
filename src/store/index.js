import {createStore,applyMiddleware} from 'redux'
import logger from 'redux-logger'
import rootReducers from './reducer/reducers'
const store=createStore(rootReducers,applyMiddleware(logger))
export default store;