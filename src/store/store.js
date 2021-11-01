import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import locationReducer from '../reducers/LocationReducer';

const rootReducer = combineReducers({
  locationReducer,
});
export const store = createStore(rootReducer, applyMiddleware(thunk));
