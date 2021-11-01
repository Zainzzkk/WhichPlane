import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Map} from '../screens/Map';
import {ListView} from '../screens/ListView';

const Tab = createBottomTabNavigator();

const screenOptions = {
  showLabel: true,
  activeTintColor: '#9381ff',
  style: {
    height: '10%',
  },
};

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Map"
          component={Map}
          // options={{
          //   tabBarIcon: ({color, size}) => (
          //     <MaterialIcons name="movie-filter" color={color} size={size} />
          //   ),
          // }}
        />
        <Tab.Screen
          name="List"
          component={ListView}
          // options={{
          //   tabBarIcon: ({color, size}) => (
          //     <MaterialIcons name="favorite" color={color} size={size} />
          //   ),
          // }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
