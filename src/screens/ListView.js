import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
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
          planes: [openSkyAPIData.planes],
        }),
      2000,
    );
  }
  keyExtractor = (item, index) => index.toString();

  renderItem = ({item}) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item[1]}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );

  render() {
    console.log('planes', this.state.planes[0]);
    return (
      <FlatList
        keyExtractor={this.keyExtractor}
        data={this.state.planes[0]}
        renderItem={this.renderItem}
      />
    );
  }
}
