import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import DefaultStackScreen from './src/navigation/DefaultStackScreen';
import {ThemeColor} from './src/utils/Constant';

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <StatusBar
          backgroundColor={ThemeColor}
          barStyle="light-content"></StatusBar>
        <NavigationContainer>
          <DefaultStackScreen />
        </NavigationContainer>
      </React.Fragment>
    );
  }
}
