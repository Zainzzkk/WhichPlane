import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Map from '../screens/Map';
import PlaneInfo from '../screens/PlaneInfo';
import ListView from '../screens/ListView';

const Stack = createNativeStackNavigator();

export const MapViewNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MapView"
        component={Map}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PlaneInfo"
        component={PlaneInfo}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export const ListViewNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListView"
        component={ListView}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PlaneInfo"
        component={PlaneInfo}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
