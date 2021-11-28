import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';

import {styles} from './styles';

export default class PlaneInfo extends React.Component {
  constructor() {
    super();
  }

  render() {
    const {item} = this.props.route.params;
    console.log(item);
    return (
      <View style={styles.container}>
        <View style={styles.firstContainer}>
          <Image style={styles.picture} source={{uri: item.imageLink}} />
        </View>
        <View style={styles.secondContainer}>
          <View
            style={[
              styles.container,
              {
                flexDirection: 'row',
                alignContent: 'space-between',
              },
            ]}>
            <BoxInfo1 item={item} />
            <BoxInfo2 item={item} />
          </View>
        </View>
      </View>
    );
  }
}

const BoxInfo1 = ({item}) => (
  <View style={[styles.row, {flexDirection: 'column'}]}>
    <Text style={styles.label}>Registration</Text>
    <Text style={styles.input}>{item.Tail} </Text>
    <Text style={styles.label}>Manufacturer</Text>
    <Text style={styles.input}>{item.Manufacturer} </Text>
    <Text style={styles.label}>Type</Text>
    <Text style={styles.input}>{item.Type} </Text>
  </View>
);

const BoxInfo2 = ({item}) => (
  <View style={[styles.row, {flexDirection: 'column'}]}>
    <Text style={styles.label}>Airline/Owner</Text>
    <Text style={styles.input}>{item.RegisteredOwners} </Text>
    <Text style={styles.label}>FlightNumber</Text>
    <Text style={styles.input}>{item.flightNumber} </Text>
    <Text style={styles.label}>ModeS</Text>
    <Text style={styles.input}>{item.ModeS} </Text>
  </View>
);

let headers = new Headers({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'User-Agent': 'WhichPlane',
});

const getEachImage = hex => {
  let images = {};
  getImages(hex).then(data => {
    console.log(data[0]);
    images.Author = data[0].photographer;
    images.imageLink = data[0].thumbnail_large.src;
    return images;
  });
  return images;
};

const getImages = hex => {
  const string = 'https://api.planespotters.net/pub/photos/hex/' + hex;
  return fetch(string, {
    method: 'GET',
    headers: headers,
  }).then(picture => picture.json().then(eachPicture => eachPicture.photos));
};
