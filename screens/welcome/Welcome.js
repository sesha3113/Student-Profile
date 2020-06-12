import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import WelcomeStyles from './WelcomeStyles';
import {FAB} from 'react-native-paper';
import {StyleSheet} from 'react-native';
export default class Welcome extends Component {
  state = {};
  render() {
    return (
      <View style={WelcomeStyles.Container}>
        <View Style={WelcomeStyles.ImageContainer}>
          <Image
            style={WelcomeStyles.ImageStyle}
            source={require('./assets/Vcet_logo.jpeg')}
          />
        </View>
        <View style={WelcomeStyles.TextStyle}>
          <Text style={WelcomeStyles.Text}>
            Velammal College of Engineering and Technology
          </Text>
          {/* <Text style={WelcomeStyles.TextExtra}> and Technology </Text> */}
        </View>
      </View>
    );
  }
}
