import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';

import {useSelector, useDispatch} from 'react-redux';
import {getConstantLocation, getLocation} from '../actions/LocationActions';
import {OpenSkyAPIData} from '../actions/OpenSkyAPIData';

import Map from '../screens/Map';
import ListView from '../screens/ListView';
import {LoadingScreen} from '../screens/LoadingScreen';

const Tab = createBottomTabNavigator();
export let exportingcoords;

const screenOptions = (route, color) => {
  let iconName;

  switch (route.name) {
    case 'Map':
      iconName = 'enviroment';
      break;
    case 'List':
      iconName = 'bars';
      break;
    default:
      break;
  }

  return <Icon name={iconName} color={color} size={30} />;
};

export const RootNavigator = () => {
  exportingcoords = useSelector(state => state.locationReducer);
  const dispatch = useDispatch();
  const currentLocation = () => dispatch(getLocation());
  const constantLocation = () => dispatch(getConstantLocation());

  useEffect(() => {
    currentLocation();
    setInterval(() => {
      constantLocation();
    }, 5000);
    setInterval(() => {
      // console.log('export', exportingcoords.coordinates.latitude);
      //OpenSkyAPIData({exportingcoords});
    }, 2000);
  }, []);


  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color}) => screenOptions(route, color),
        })}>
        <Tab.Screen name="Map" component={Map} options={{headerShown: false}} />
        <Tab.Screen
          name="List"
          component={ListView}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
