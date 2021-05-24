import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import AppTabsScreen from './AppTabsScreen';

import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Avatar, Title, Caption, Paragraph, Drawer} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {logout} from '../../actions/auth';

const AppDrawer = createDrawerNavigator();

const AppDrawerScreen = ({logout, auth}) => {
  return (
    <AppDrawer.Navigator
      drawerContent={(props) => (
        <DrawerContent {...props} logout={logout} auth={auth} />
      )}>
      <AppDrawer.Screen name="App" component={AppTabsScreen} />
    </AppDrawer.Navigator>
  );
};

function DrawerContent(props) {
  const {
    logout,
    navigation,
    auth: {user},
  } = props;
  const onSubmit = () => {
    logout(navigation);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <DrawerContentScrollView {...props}>
          <View style={styles.drawerContent}>
            <View style={styles.userInfoSection}>
              <View style={{flexDirection: 'row', marginTop: 15}}>
                <Avatar.Text
                  size={50}
                  label={user && user.name.substr(0, 1)}
                  theme={{colors: {primary: '#0C6CD5'}}}
                />
                <View style={{marginLeft: 15, flexDirection: 'column'}}>
                  <Text style={styles.title}>{user && user.name}</Text>
                  <Caption style={styles.caption}>
                    {user && (
                      <Icon
                        style={{color: 'green', fontSize: 14}}
                        name="circle">
                        {' '}
                        Online
                      </Icon>
                    )}
                  </Caption>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.section}>
                  <Paragraph style={[styles.paragraph, styles.caption]}>
                    Status :
                  </Paragraph>
                  <Caption style={[styles.caption, {marginLeft: 10}]}>
                    {user && user.status}
                  </Caption>
                </View>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <View style={{padding: 20}}>
              <Text style={{fontWeight: 'bold', color: '#0C6CD5'}}>
                #{'relevant'.toLowerCase()}
              </Text>
              <Text style={{fontWeight: 'bold', color: '#0C6CD5'}}>
                #{'top viewed'.toLowerCase()}
              </Text>
              <Text style={{fontWeight: 'bold', color: '#0C6CD5'}}>
                #{'top rated'.toLowerCase()}
              </Text>
            </View>

            {/* <DrawerItem
            icon={({color, size}) => (
              <Icon name="home-outline" color={color} size={size} />
            )}
            label="Home"
            onPress={() => {
              props.navigation.navigate('allPost');
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="account-outline" color={color} size={size} />
            )}
            label="Profile"
            onPress={() => {
              props.navigation.navigate('Home');
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="help-circle-outline" color={color} size={size} />
            )}
            label="Help"
            onPress={() => {
              props.navigation.navigate('Help');
            }}
          /> */}
          </Drawer.Section>
        </DrawerContentScrollView>
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="exit-to-app" color={color} size={size} />
            )}
            label="Logout"
            onPress={() => {
              onSubmit();
            }}
          />
        </Drawer.Section>
      </View>
    </SafeAreaView>
  );
}

AppDrawerScreen.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 18,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
});

export default connect(mapStateToProps, {logout})(AppDrawerScreen);
