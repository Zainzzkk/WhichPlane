import {GET_LOCATION, GET_CONSTANT_LOCATION} from '../actions/LocationActions';

const initialState = {
  coordinates: {},
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOCATION:
      console.log('in reducer', GET_LOCATION);
      return {
        ...state,
        coordinates: action.payload,
      };
    case GET_CONSTANT_LOCATION:
      console.log('in constant location reducer', GET_CONSTANT_LOCATION);
      return {
        ...state,
        coordinates: action.payload,
      };
    default: {
      console.log('not');
      return state;
    }
  }
};

export default locationReducer;
