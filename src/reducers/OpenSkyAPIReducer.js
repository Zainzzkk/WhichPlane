import {GET_OPENSKY_PLANE_DATA} from '../actions/OpenSkyAPIActions';

const initialState = {
  planes: {},
};

const openSkyAPIReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_OPENSKY_PLANE_DATA:
      console.log('inopenskyreducer');
      return {
        ...state,
        planes: action.payload,
      };
    default: {
      console.log('notopenskyapireducer');
      return state;
    }
  }
};

export default openSkyAPIReducer;
