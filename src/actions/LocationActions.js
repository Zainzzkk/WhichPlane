export const GET_LOCATION = 'GET_LOCATION';

import Geolocation from 'react-native-geolocation-service';

// export const getLocation = () => {
//     Geolocation.getCurrentPosition((position => {
//       console.log(position.coords);
//     }));
// };

export function getLocation() {
  return dispatch => {
    Geolocation.getCurrentPosition(
      position => {
        dispatch({
          type: GET_LOCATION,
          payload: position.coords,
        });
      },
      error => console.log(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };
}

// export function getLocation() {
//   return dispatch => {
//     Geolocation.getCurrentPosition(position => {
//       console.log('get position', position.coords);
//       dispatch({
//         type: GET_LOCATION,
//         payload: position.coords,
//       });
//     });
//   };
// }
