/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import Profiles from './screens/Profile/Profiles';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {View, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Welcome from './screens/welcome/Welcome';
import LoggedOff from './screens/Logged_off/LoggedOff';
import Signup from './screens/CreateUser/Signup';
import LoginForm from './screens/Logged_off/LoginForm';
import EditProfiles from './screens/Edit/EditProfile';

const Stack = createStackNavigator();

function App() {
  return (
    <View style={styles.container}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="LoggedOff" component={LoggedOff} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Profiles" component={Profiles} />
        <Stack.Screen name="LoginForm" component={LoginForm} />
        <Stack.Screen name="EditProfiles" component={EditProfiles} />
      </Stack.Navigator>
    </View>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
