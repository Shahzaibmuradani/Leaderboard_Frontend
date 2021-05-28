import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
//mport NewPost from '../Tabs/NewPost';

const DrawerIcon = (props) => {
  const drawerToggleHandler = () => {
    props.navigation.toggleDrawer();
  };
  return (
    <>
      <View style={[styles.container, {flexDirection: 'row'}]}>
        <FontAwesome5Icon
          style={styles.icon}
          name="bars"
          onPress={drawerToggleHandler}
          size={18}
        />
        <Text style={styles.text}>
          HearMeOut <FontAwesome5Icon name="bullhorn" size={22} />
        </Text>
        {props.user &&
          (props.user.status === 'Recruiter' ||
            props.user.status === 'Organizer') && (
            <FontAwesome5Icon
              style={styles.icon1}
              name="plus"
              onPress={() => props.navigation.navigate('NewPost')}
              size={20}
            />
          )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    margin: 10,
    marginHorizontal: 14,
  },
  icon: {
    margin: 6,
    marginEnd: 'auto',
  },
  icon1: {
    alignSelf: 'center',
    marginHorizontal: 6,
    color: '#0C6CD5',
  },
  text: {
    color: '#0C6CD5',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 22,
    marginEnd: 'auto',
  },
});

export default DrawerIcon;
