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
import Relevant from '../Tabs/Relevant';
import {connect} from 'react-redux';
import MyPosts from '../Tabs/MyPosts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// import {loadUser} from '../../actions/auth';

//const AppTabs = createBottomTabNavigator();
const AppTabs = createMaterialBottomTabNavigator();

const AppTabsScreen = ({auth: {user}, navigation}) => {
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <DrawerIcon navigation={navigation} />
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
          {user.status === 'Admin' ? (
            <AppTabs.Screen
              name="Irrelevant"
              component={Relevant}
              options={{
                tabBarLabel: 'Irrelevant',
                tabBarIcon: (props) => (
                  <FontAwesome name="tasks" color={props.color} size={20} />
                ),
              }}
            />
          ) : user.status === 'Student' ? (
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
          ) : (
            <AppTabs.Screen
              name="MyPosts"
              component={MyPosts}
              options={{
                tabBarLabel: 'My Posts',
                tabBarIcon: (props) => (
                  <FontAwesome name="tasks" color={props.color} size={20} />
                ),
              }}
            />
          )}
        </AppTabs.Navigator>
      </SafeAreaView>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(AppTabsScreen);
