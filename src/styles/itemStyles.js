import {StyleSheet} from 'react-native';
import {BlueColor, SHeight} from '../utils/Constant';

export const styles = StyleSheet.create({
  titleStyle: {
    fontWeight: 'bold',
  },
  textStyle: {
    color: BlueColor,
  },
  commentStyle: {
    alignSelf: 'center',
  },
  avatarStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
  listStyle: {
    marginBottom: SHeight * 0.05,
  },
});
