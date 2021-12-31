import {createStore,applyMiddleware} from 'redux'
import cakeReducer from './CakeReducer'
import rootReducer from '../rootReducer'
import {logger} from 'redux-logger';

const Store= createStore(rootReducer,applyMiddleware(logger))

export default Store