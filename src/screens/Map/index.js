import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import {useSelector, useDispatch} from 'react-redux';
import {getLocation} from '../../actions/LocationActions';

import styles from './styles';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export const Map = () => {
  const {coordinates} = useSelector(state => state.locationReducer);
  const dispatch = useDispatch();
  const currentLocation = () => dispatch(getLocation());

  useEffect(() => {
    console.log('called');
    currentLocation();
    console.log('call finished');
  }, []);
  console.log('coords', coordinates);
  if (coordinates !== undefined && coordinates.latitude !== null) {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
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
  }
};
