import React from 'react';
import {Image, Text, View} from 'react-native';

import {differenceInYears} from 'date-fns';

import {styles} from './styles';

import {MONGODB_API_KEY} from '../../../config';

let interval;
let registered = '';

export default class PlaneInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      time: '',
    };
  }

  componentDidMount() {
    if (registered === '') {
      interval = setInterval(() => {
        console.log('wppp');
        this.setState({
          time: Date.now(),
        });
      }, 5000);
    }
  }

  render() {
    let {item} = this.props.route.params;

    item = getRegDetails(item.ModeS, item);
    console.log(item);
    console.log('key', MONGODB_API_KEY);
    clearInterval(interval);
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
    <Text style={styles.label}>Age</Text>
    <Text style={styles.input}>{item.Age} Years </Text>
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
    <Text style={styles.label}>Registration Date</Text>
    <Text style={styles.input}>{item.RegisteredDate} </Text>
  </View>
);

const getRegDetails = (hex, item) => {
  getReg(hex).then(registration => {
    console.log('reg', registration.built);
    if (
      registration &&
      registration.built &&
      registration.built !== '0001-01-01'
    ) {
      item.RegisteredDate = registration.built;
    } else {
      item.RegisteredDate = 'Unknown';
    }
  });
  item = getAgeDifference(item.RegisteredDate, item);
  return item;
};

const getReg = hex => {
  console.log('me here');
  console.log('hex is', hex);
  let isnum = /^\d+$/.test(hex);
  if (isnum) {
    hex = parseInt(hex, 10);
  }
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Access-Control-Request-Headers', '*');
  myHeaders.append('api-key', MONGODB_API_KEY);

  var raw = JSON.stringify({
    collection: 'planeData',
    database: 'planeDatabase',
    dataSource: 'planeDatabase',
    filter: {
      icao24: hex,
    },
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  return fetch(
    'https://data.mongodb-api.com/app/data-sfqje/endpoint/data/beta/action/findOne',
    requestOptions,
  )
    .then(response => response.json())
    .then(result => {
      console.log(result);
      if (result.document) {
        return result.document;
      } else {
        return result;
      }
    })
    .catch(error => console.log('error', error));
};

const getAgeDifference = (date, individualMap) => {
  if (date === 'Unknown') {
    individualMap.Age = 'Unknown';
  } else {
    individualMap.Age = differenceInYears(new Date(), new Date(date));
  }
  return individualMap;
};
