import {GET_LOCATION} from '../actions/LocationActions';

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
    default: {
      return state;
    }
  }
};

export default locationReducer;
