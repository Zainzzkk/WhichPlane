export const GET_LOCATION = 'GET_LOCATION';
export const GET_CONSTANT_LOCATION = 'GET_CONSTANT_LOCATION';

import {
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
} from 'react-native';

import Geolocation from 'react-native-geolocation-service';
import appConfig from '../../app.json';

export const getLocation = () => async dispatch => {
  const hasPermission = await hasLocationPermission();

  if (!hasPermission) {
    return;
  }

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

export const getConstantLocation = () => async dispatch => {
  console.log('constantlocationcalled');
  const hasPermission = await hasLocationPermission();

  if (!hasPermission) {
    return;
  }

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

const hasPermissionIOS = async () => {
  const openSetting = () => {
    Linking.openSettings().catch(() => {
      Alert.alert('Unable to open settings');
    });
  };
  const status = await Geolocation.requestAuthorization('whenInUse');

  if (status === 'granted') {
    return true;
  }

  if (status === 'denied') {
    Alert.alert('Location permission denied');
  }

  if (status === 'disabled') {
    Alert.alert(
      `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
      '',
      [
        {text: 'Go to Settings', onPress: openSetting},
        {text: "Don't Use Location", onPress: () => {}},
      ],
    );
  }

  return false;
};

const hasLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    const hasPermission = await hasPermissionIOS();
    return hasPermission;
  }

  if (Platform.OS === 'android' && Platform.Version < 23) {
    return true;
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    ToastAndroid.show(
      'Location permission revoked by user.',
      ToastAndroid.LONG,
    );
  }

  return false;
};
