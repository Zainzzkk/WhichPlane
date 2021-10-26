import React, {useState} from 'react';
import {View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import {OpenSkyAPIData} from '../../actions/OpenSkyAPIData';
import {Icon, Image} from 'native-base';

import styles from './styles';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export const Map = ({coordinates}) => {
  if (coordinates === undefined) {
    return null;
  } else {
    OpenSkyAPIData(coordinates);

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
