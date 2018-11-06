import { createStore, applyMiddleware } from 'redux'
import rootReducers from './reducers/index'
import initialState from './initialState'
import {ISDEBUG} from '../utils/system';

import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';
import logger from 'redux-logger';

const createStoreHandler = () => {
  return createStore(
    rootReducers, 
    initialState,
    composeWithDevTools(
      ISDEBUG ? applyMiddleware(thunk, logger) : applyMiddleware(thunk)
    )
  )
}

export default createStoreHandler();