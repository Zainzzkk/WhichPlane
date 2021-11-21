export const GET_LOCATION = 'GET_LOCATION';
export const GET_CONSTANT_LOCATION = 'GET_CONSTANT_LOCATION';

import Geolocation from 'react-native-geolocation-service';

export const getLocation = () => dispatch => {
  console.log('getlocationaction');
  Geolocation.getCurrentPosition(
    position => {
      dispatch({
        type: GET_LOCATION,
        payload: position.coords,
      });
    },
    error => console.log(error.message),
    {
      enableHighAccuracy: false,
      timeout: 20000,
      accuracy: {
        android: 'high',
        ios: 'best',
      },
    },
  );
};

export const getConstantLocation = () => dispatch => {
  console.log('constantlocationcalled');
  Geolocation.watchPosition(
    position => {
      console.log('coords in const loc', position.coords);
      dispatch({
        type: GET_CONSTANT_LOCATION,
        payload: position.coords,
      });
    },
    error => console.log(error.message),
    {
      enableHighAccuracy: false,
      accuracy: {
        android: 'high',
        ios: 'best',
      },
    },
  );
};
