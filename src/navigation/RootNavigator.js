import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';

import {useSelector, useDispatch} from 'react-redux';
import {getLocation} from '../actions/LocationActions';

import {Map} from '../screens/Map';
import {ListView} from '../screens/ListView';
import {LoadingScreen} from '../screens/LoadingScreen';

const Tab = createBottomTabNavigator();

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
