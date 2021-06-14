import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {ThemeColor, WhiteColor} from '../../utils/Constant';
//mport NewPost from '../Tabs/NewPost';

const DrawerIcon = (props) => {
  const drawerToggleHandler = () => {
    props.navigation.toggleDrawer();
  };
  return (
    <>
      <View style={styles.container}>
        <View>
          <TouchableOpacity onPress={drawerToggleHandler}>
            <FontAwesome5Icon name="bars" size={20} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.text}>
            HearMeOut <FontAwesome5Icon name="bullhorn" size={22} />
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('NewPost')}>
            {props.user &&
              (props.user.status === 'Recruiter' ||
                props.user.status === 'Organizer') && (
                <FontAwesome5Icon name="plus" size={20} />
              )}
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
    margin: 10,
    backgroundColor: WhiteColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 13,
  },
  text: {
    color: ThemeColor,
    fontWeight: 'bold',
    fontSize: 22,
  },
});

export default DrawerIcon;
