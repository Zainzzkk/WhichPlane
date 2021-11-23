import {mappedData, openSkyAPIData} from '../navigation/RootNavigator';

export const mappedPlaneData = () => {
  const planeData = openSkyAPIData.planes;
  // console.log(planeData);
  Object.keys(planeData).map(function (key, index) {
    let individualMap = {};
    individualMap.Latitude = planeData[key][6];
    individualMap.Longitude = planeData[key][5];
    if (planeData[key][13] !== null) {
      individualMap.Altitude = planeData[key][13] * 3.2808;
    } else {
      individualMap.Altitude = 0;
    }
    if (planeData[key][11] !== null) {
      individualMap['Vertical Speed'] = planeData[key][11] * 196.85039370079;
    } else {
      individualMap['Vertical Speed'] = 'NA';
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
      individualMap.Speed = planeData[key][9];
    } else {
      individualMap.Speed = 0;
    }
    mappedData[planeData[key][0]] = individualMap;
    // console.log(mappedData);
  });
};

const getAircraftInfo = (plane, individualMap) => {
  const string = 'https://api.joshdouch.me/api/aircraft/' + plane;
  return fetch(string)
    .then(response => {
      return response.json().then(data => {
        Object.keys(data).map(function (key, index) {
          // console.log('info', data[key]);
          individualMap[key] = data[key];
        });
        return individualMap;
      });
    })
    .catch(err => {
      console.log(err);
    });
};

const getTailInfo = plane => {
  const string = 'https://api.joshdouch.me/hex-reg.php?hex=' + plane;
  return fetch(string)
    .then(response => {
      return response.text();
    })
    .then(responseJson => {
      console.log(responseJson);
      return responseJson;
    })
    .catch(error => {
      console.error(error);
    });
};
