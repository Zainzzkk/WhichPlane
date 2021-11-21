export const GET_OPENSKY_PLANE_DATA = 'GET_OPENSKY_PLANE_DATA';

export const getOpenSkyPlaneData = coords => dispatch => {
  console.log('getopenskyapiaction');
  const planeData = getPlaneAPIData(coords);
  if (planeData) {
    dispatch({
      type: GET_OPENSKY_PLANE_DATA,
      payload: planeData,
    });
  }
};

const degree_to_radian = degrees => {
  return (degrees / 180.0) * Math.PI;
};

const calc_max_lat = coordinates => {
  return coordinates.latitude + 50 / 112.12;
};

const calc_min_lat = coordinates => {
  return coordinates.latitude - 50 / 112.12;
};

const calc_max_long = coordinates => {
  return (
    coordinates.longitude +
    50 / Math.abs(Math.cos(degree_to_radian(coordinates.longitude)) * 111.2)
  );
};

const calc_min_long = coordinates => {
  return (
    coordinates.longitude -
    50 / Math.abs(Math.cos(degree_to_radian(coordinates.longitude)) * 111.2)
  );
};

const getPlaneAPIData = coordinates => {
  console.log('nah I here');
  const string =
    'https://opensky-network.org/api/states/all??lamin=' +
    calc_min_lat(coordinates) +
    '&lomin=' +
    calc_min_long(coordinates) +
    '&lamax=' +
    calc_max_lat(coordinates) +
    '&lomax=' +
    calc_max_long(coordinates);
  return fetch(string).then(response => {
    return response
      .json()
      .then(data => {
        console.log('data', data.states);
        return data.states;
      })
      .catch(err => {
        console.log(err);
      });
  });
};
