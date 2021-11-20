import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

import {exportingcoords} from '../navigation/RootNavigator';

export default class ListView extends React.Component {
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
    return (
      <View>
        <Text>{this.state.coordinates.latitude}</Text>
        <Text>{this.state.coordinates.longitude}</Text>
      </View>
    );
  }
}
