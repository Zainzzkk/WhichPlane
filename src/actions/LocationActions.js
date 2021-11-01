export const GET_LOCATION = 'GET_LOCATION';

import Geolocation from 'react-native-geolocation-service';

export function getLocation() {
  return dispatch => {
    Geolocation.getCurrentPosition(position => {
      console.log('get position', position.coords);
      dispatch({
        type: GET_LOCATION,
        payload: position.coords,
      });
    });
  };
}
