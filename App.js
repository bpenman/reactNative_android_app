import { StatusBar } from 'expo-status-bar';
import React, {component, useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Calculator } from 'react-native-calculator'
import {Constants, Permissions} from 'expo';
import * as Location from 'expo-location';


    function CalcScreen() {
      return (
        <View style={{ flex: 1 }}>
          <Calculator style={{ flex: 1 }} />
        </View>
      );
    }



    function MapScreen() {
    const [location, setLocation] = useState(null);
      const [errorMsg, setErrorMsg] = useState(null);

      useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }

          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        })();
      }, []);

      let lat_location = 0;
      let lon_location = 0;

        if (errorMsg) {

        } else if (location) {

          lat_location = location.coords.latitude;
          lon_location = location.coords.longitude;
        }


      return (
        <MapView
          style={{ flex: 1 }}
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: lat_location,
            longitude: lon_location,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}

          showsUserLocation={true}
        >
        </MapView>
        /*<View style={{ flex: 1}}>
            <Text>{lat_location}</Text>
        </View>*/
      );
    };


    function CreditsScreen() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
              style={{     flex: 1,

                           resizeMode: 'center'
                           }}
                source={ require('./BP_profile.png') }
              />


          <Text style={{fontSize: 20, fontWeight: 'bold'}}>App made by Brandon Penman</Text>
          <Text>Sources:</Text>
          <Text>https://github.com/react-native-maps/react-native-maps</Text>
          <Text>https://reactnative.dev/</Text>
          <Text>https://docs.expo.dev/versions/latest/sdk/location/</Text>
          <Text>https://github.com/budiadiono/react-native-calculator</Text>
          <Text>https://reactnavigation.org/</Text>
          <Text>https://docs.expo.dev/</Text>
        </View>
      );
    }

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Calculator" component={CalcScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Credits" component={CreditsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
