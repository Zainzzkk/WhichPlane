export const GET_OPENSKY_PLANE_DATA = 'GET_OPENSKY_PLANE_DATA';

export const getOpenSkyPlaneData = coords => dispatch => {
  console.log('getopenskyapiaction');
  const planeData = apiData(coords);
  // console.log('planedata', planeData);
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

const apiData = coordinates => {
  let planes = [];
  getPlaneAPIData(coordinates).then(response => {
    planes = mappedPlaneData(response, planes);
  });
  return planes;
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
    // console.log('STATUS', response.status);
    return response
      .json()
      .then(data => {
        // console.log('datastates', data.states);
        return data.states;
      })
      .catch(err => {
        console.log(err);
      });
  });
};

const mappedPlaneData = (planeData, planes) => {
  // console.log(planeData);
  Object.keys(planeData).map(function (key, index) {
    let individualMap = {};
    individualMap = getTail(planeData[key][0], individualMap);
    individualMap = aircraftInfo(planeData[key][0], individualMap);
    individualMap = getEachImage(planeData[key][0], individualMap);
    individualMap.Latitude = planeData[key][6];
    individualMap.Longitude = planeData[key][5];
    if (planeData[key][1] !== null) {
      individualMap.flightNumber = planeData[key][1];
    } else {
      individualMap.flightNumber = 'N/A';
    }
    if (planeData[key][13] !== null) {
      individualMap.Altitude = Math.round(planeData[key][13] * 3.2808);
    } else {
      individualMap.Altitude = 0;
    }
    if (planeData[key][11] !== null) {
      individualMap.verticalSpeed = Math.round(
        planeData[key][11] * 196.85039370079,
      );
    } else {
      individualMap.verticalSpeed = 'NA';
    }
    if (planeData[key][14] !== null) {
      individualMap.Squawk = planeData[key][14];
    } else {
      individualMap.Squawk = 'N/A';
    }
    if (planeData[key][10] !== null) {
      individualMap.Track = planeData[key][10];
    } else {
      individualMap.Track = 0;
    }
    if (planeData[key][9] !== null) {
      individualMap.Speed = Math.round(planeData[key][9]);
    } else {
      individualMap.Speed = 0;
    }
    planes.push(individualMap);
    // console.log(mappedData);
  });
  return planes;
};

const getTail = (planeData, individualMap) => {
  getTailInfo(planeData).then(tail => {
    individualMap.Tail = tail;
  });
  return individualMap;
};

const aircraftInfo = (planeData, individualMap) => {
  getAircraftInfo(planeData).then(data => {
    if (data.status === 400) {
      return individualMap;
    }
    Object.keys(data).map(function (key, index) {
      individualMap[key] = data[key];
    });
  });
  return individualMap;
};

const getAircraftInfo = plane => {
  const string = 'https://api.joshdouch.me/api/aircraft/' + plane;
  return fetch(string).then(response => {
    return response
      .json()
      .then(responseData => {
        return responseData;
      })
      .catch(error => {
        console.error(error);
      });
  });
};

const getTailInfo = async plane => {
  const string = 'https://api.joshdouch.me/hex-reg.php?hex=' + plane;
  return fetch(string)
    .then(response => response.text())
    .then(tailNumber => {
      return tailNumber;
    })
    .catch(err => {
      console.log(err);
    });
};

let headers = new Headers({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'User-Agent': 'WhichPlane',
});

const getEachImage = (hex, individualMap) => {
  if (!hex) {
    individualMap.Author = '';
    individualMap.imageLink = '';
  } else {
    getImages(hex).then(data => {
      //console.log(data[0]);
      individualMap.Author = data[0].photographer;
      individualMap.imageLink = data[0].thumbnail_large.src;
    });
  }
  return individualMap;
};

const getImages = hex => {
  const string = 'https://api.planespotters.net/pub/photos/hex/' + hex;
  return fetch(string, {
    method: 'GET',
    headers: headers,
  }).then(picture => picture.json().then(eachPicture => eachPicture.photos));
};
