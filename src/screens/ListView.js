import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {getConstantLocation, getLocation} from '../actions/LocationActions';

export const ListView = () => {
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
  console.log('coords in list', coordinates);

  return (
    <View>
      <Text>{coordinates.latitude}</Text>
      <Text>{coordinates.longitude}</Text>
    </View>
  );
};
