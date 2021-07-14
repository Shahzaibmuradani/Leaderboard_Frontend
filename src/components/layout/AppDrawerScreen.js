import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import AppTabsScreen from './AppTabsScreen';

import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Caption, Paragraph, Drawer} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import UserAvatar from 'react-native-user-avatar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {logout} from '../../redux/actions/auth';
import Spinner from '../layout/Spinner';
import {GreenColor} from '../../utils/Constant';

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
    auth: {user, loading},
  } = props;
  const onSubmit = () => {
    logout(navigation);
  };

  // useEffect(() => {
  //   user;
  // }, [user]);

  return loading && user === null ? (
    <Spinner />
  ) : (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <DrawerContentScrollView {...props}>
          <View style={styles.drawerContent}>
            <View style={styles.userInfoSection}>
              <View style={{flexDirection: 'row', marginTop: 15}}>
                {user && user.name.length > 0 && (
                  <UserAvatar
                    size={50}
                    src="https://www.gravatar.com/avatar/312d524f1e9101091b077371a4788b54?s=200&r=pg&d=mm"
                    // name={user && user.name.charAt(0)}
                  />
                )}
                <View style={{marginLeft: 15, flexDirection: 'column'}}>
                  <Text style={styles.title}>{user && user.name}</Text>
                  <Caption style={styles.caption}>
                    {user && (
                      <Icon
                        style={{color: GreenColor, fontSize: 14}}
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
            {user && user.status !== 'Student' && (
              <DrawerItem
                icon={({color, size}) => (
                  <Icon name="help-circle-outline" color={color} size={size} />
                )}
                label="Help"
                onPress={() => {
                  navigation.navigate('Help');
                }}
              />
            )}
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
    marginTop: 16,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
});

export default connect(mapStateToProps, {logout})(AppDrawerScreen);
