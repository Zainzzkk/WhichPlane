import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {useSelector, useDispatch} from 'react-redux';
import {getLocation} from '../actions/LocationActions';

import {Map} from '../screens/Map';
import {ListView} from '../screens/ListView';
import {LoadingScreen} from '../screens/LoadingScreen';

const Tab = createBottomTabNavigator();

const screenOptions = {
    showLabel: true,
    activeTintColor: '#9381ff',
    style: {
        height: '10%',
    },
};

export const RootNavigator = () => {
    // const {coordinates} = useSelector(state => state.locationReducer);
    // const dispatch = useDispatch();
    // const currentLocation = () => dispatch(getLocation());
    //
    // useEffect(() => {
    //   currentLocation();
    // }, []);

    // console.log(coordinates);
    // if (coordinates.latitude === undefined) {
    //   return <LoadingScreen />;
    // } else {
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
    // }
};
