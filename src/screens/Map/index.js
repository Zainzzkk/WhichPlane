import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

import styles from './styles';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import {useSelector, useDispatch} from 'react-redux';
import {getLocation, getConstantLocation} from '../../actions/LocationActions';

export const Map = () => {
  const {coordinates} = useSelector(state => state.locationReducer);
  const dispatch = useDispatch();
  const currentLocation = () => dispatch(getLocation());
  const constantLocation = () => dispatch(getConstantLocation());

  useEffect(() => {
    currentLocation();
    setInterval(() => {
      constantLocation();
    }, 50000);
  }, []);
  if (
    coordinates.latitude !== undefined &&
    coordinates.longitude !== undefined
  ) {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          zoomEnabled={true}
          zoomControlEnabled={true}
          region={{
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{
              latitude: coordinates.latitude,
              longitude: coordinates.longitude,
            }}
          />
        </MapView>
      </View>
    );
  } else {
    return null;
  }
};
