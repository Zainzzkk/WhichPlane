import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {promiseMiddleware} from '../middleware/middleware';
import locationReducer from '../reducers/LocationReducer';
import openSkyAPIReducer from '../reducers/OpenSkyAPIReducer';

const rootReducer = combineReducers({
  locationReducer,
  openSkyAPIReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
