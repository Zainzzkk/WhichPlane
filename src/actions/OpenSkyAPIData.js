import {Component, useState} from 'react';

export const OpenSkyAPIData = coordinates => {
  if (coordinates === undefined) {
    return null;
  } else {
    function degree_to_radian(degrees) {
      return (degrees / 180.0) * Math.PI;
    }

    function calc_max_lat() {
      return coordinates.latitude + 50 / 112.12;
    }

    function calc_min_lat() {
      return coordinates.latitude - 50 / 112.12;
    }

    function calc_max_long() {
      return (
        coordinates.longitude +
        50 / Math.abs(Math.cos(degree_to_radian(coordinates.longitude)) * 111.2)
      );
    }

    function calc_min_long() {
      return (
        coordinates.longitude -
        50 / Math.abs(Math.cos(degree_to_radian(coordinates.longitude)) * 111.2)
      );
    }

    function getPlaneAPIData() {
      var string =
        'https://opensky-network.org/api/states/all??lamin=' +
        calc_min_lat() +
        '&lomin=' +
        calc_min_long() +
        '&lamax=' +
        calc_max_lat() +
        '&lomax=' +
        calc_max_long();
      fetch(string)
        .then(response => response.json())
        .then(data => {
          console.log(data.states);
        });
    }

    getPlaneAPIData();
  }
};
