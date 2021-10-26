import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';

import Geolocation from 'react-native-geolocation-service';

import {Map} from '../components/Map';

export default class LocationActions extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      coordinates: [],
      locationSet: false,
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    Geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          coordinates: this.state.coordinates.concat({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
          locationSet: true,
        });
      },
      error => {
        Alert.alert(error.message.toString());
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        //enableHighAccuracy: highAccuracy,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        //forceRequestLocation: forceLocation,
        //forceLocationManager: useLocationManager,
        //showLocationDialog: locationDialog,
      },
    );
    Geolocation.watchPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          coordinates: this.state.coordinates.concat({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
          locationSet: true,
        });
      },
      error => {
        console.log(error);
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        //enableHighAccuracy: highAccuracy,
        distanceFilter: 0,
        interval: 5000,
        fastestInterval: 2000,
        //forceRequestLocation: forceLocation,
        //forceLocationManager: useLocationManager,
        //showLocationDialog: locationDialog,
        //useSignificantChanges: significantChanges
      },
    );
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <View style={styles.container}>
        <Map
          coordinates={
            this.state.coordinates[this.state.coordinates.length - 1]
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
