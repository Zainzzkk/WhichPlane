import {GET_LOCATION} from '../actions/LocationActions';

const initialState = {
  coordinates: {},
};

export function locationReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LOCATION:
      console.log(GET_LOCATION);
      return {
        ...state,
        coordinates: action.payload,
      };
    default: {
      return state;
    }
  }
}
