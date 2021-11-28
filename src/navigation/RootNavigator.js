import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';

import {useSelector, useDispatch} from 'react-redux';
import {getConstantLocation, getLocation} from '../actions/LocationActions';
import {getOpenSkyPlaneData} from '../actions/OpenSkyAPIActions';

import Map from '../screens/Map';
import ListView from '../screens/ListView';

import {MapViewNavigator, ListViewNavigator} from '../component/navigation';

const Tab = createBottomTabNavigator();
export let exportingcoords;
export let openSkyAPIData;

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
  openSkyAPIData = useSelector(state => state.openSkyAPIReducer);
  const dispatch = useDispatch();
  const currentLocation = () => dispatch(getLocation());
  const constantLocation = () => dispatch(getConstantLocation());
  const getOpenSkyPlanes = () =>
    dispatch(getOpenSkyPlaneData(exportingcoords.coordinates));

  useEffect(() => {
    currentLocation();
    setInterval(() => {
      constantLocation();
    }, 10000);
    setInterval(() => {
      if (exportingcoords.coordinates.latitude) {
        getOpenSkyPlanes();
        // console.log('data', openSkyAPIData.planes);
      }
    }, 5000);
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color}) => screenOptions(route, color),
        })}>
        <Tab.Screen
          name="Map"
          component={MapViewNavigator}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="List"
          component={ListViewNavigator}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
