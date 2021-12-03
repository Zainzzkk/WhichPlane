import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';

import {openSkyAPIData} from '../navigation/RootNavigator';

export default class ListView extends React.Component {
  constructor() {
    super();
    this.state = {
      planes: [],
    };
  }

  componentDidMount() {
    this.interval = setInterval(
      () =>
        this.setState({
          planes: openSkyAPIData.planes,
        }),
      5000,
    );
  }
  keyExtractor = (item, index) => index.toString();

  renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        this.props.navigation.navigate('PlaneInfo', {
          item: item,
        })
      }>
      <View>
        <ListItem bottomDivider>
          {/*<Avatar source={{uri: item.avatar_url}} />*/}
          <ListItem.Content>
            <ListItem.Title>{item.flightNumber}</ListItem.Title>
            <ListItem.Title>{item.Speed}</ListItem.Title>
            <ListItem.Title>{item.Altitude}</ListItem.Title>
            <ListItem.Title>{item.Squawk}</ListItem.Title>
            <ListItem.Title>{item.Type}</ListItem.Title>
            <ListItem.Title>{item.Tail}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </View>
    </TouchableOpacity>
  );

  render() {
    if (this.state.planes.length === 0) {
      return null;
    }
    console.log('planes', this.state.planes);
    return (
      <FlatList
        keyExtractor={this.keyExtractor}
        data={this.state.planes}
        renderItem={this.renderItem}
      />
    );
  }
}
