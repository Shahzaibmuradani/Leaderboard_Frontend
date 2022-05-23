import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';

const DefaultStack = createStackNavigator();

const DefaultStackScreen = (props) => {
  return (
    <DefaultStack.Navigator headerMode="none">
      <DefaultStack.Screen name="home" component={Home} />
    </DefaultStack.Navigator>
  );
};

export default DefaultStackScreen;
