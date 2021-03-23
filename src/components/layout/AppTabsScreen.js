import React from 'react';

// import {connect} from 'react-redux';
// import PropTypes from 'prop-types';

import {SafeAreaView} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from '../Tabs/Home';
import DrawerIcon from './DrawerIcon';
import allPosts from '../Tabs/allPosts';
import Help from '../Tabs/Help';

// import {loadUser} from '../../actions/auth';

//const AppTabs = createBottomTabNavigator();
const AppTabs = createMaterialBottomTabNavigator();

const AppTabsScreen = (props) => {
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <DrawerIcon navigation={props.navigation} />
        <AppTabs.Navigator barStyle={{backgroundColor: '#0C6CD5'}}>
          <AppTabs.Screen
            name="allPosts"
            component={allPosts}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: (props) => (
                <MaterialCommunityIcons
                  name="home-outline"
                  color={props.color}
                  size={20}
                />
              ),
            }}
          />
          <AppTabs.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: 'Profile',
              tabBarIcon: (props) => (
                <MaterialCommunityIcons
                  name="account-outline"
                  color={props.color}
                  size={20}
                />
              ),
            }}
          />
          <AppTabs.Screen
            name="Help"
            component={Help}
            options={{
              tabBarLabel: 'Help',
              tabBarIcon: (props) => (
                <MaterialCommunityIcons
                  name="help-circle-outline"
                  color={props.color}
                  size={20}
                />
              ),
            }}
          />
        </AppTabs.Navigator>
      </SafeAreaView>
    </>
  );
};

export default AppTabsScreen;
