import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

import styles from './styles';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {exportingcoords} from '../../navigation/RootNavigator';

export default class Map extends React.Component {
  constructor() {
    super();
    this.state = {
      coordinates: {latitude: null, longitude: null},
    };
  }

  componentDidMount() {
    this.interval = setInterval(
      () =>
        this.setState({
          coordinates: {
            latitude: exportingcoords.coordinates.latitude,
            longitude: exportingcoords.coordinates.longitude,
          },
        }),
      2000,
    );
  }
  render() {
    if (this.state.coordinates.longitude) {
      return (
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            zoomEnabled={true}
            zoomControlEnabled={true}
            region={{
              latitude: this.state.coordinates.latitude,
              longitude: this.state.coordinates.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker
              coordinate={{
                latitude: this.state.coordinates.latitude,
                longitude: this.state.coordinates.latitude,
              }}
            />
          </MapView>
        </View>
      );
    } else {
      return null;
    }
  }
}
