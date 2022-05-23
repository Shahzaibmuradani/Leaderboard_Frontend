import {StyleSheet} from 'react-native';
import {RedColor, SHeight, SWidth, WhiteColor} from '../utils/Constant';

export const styles = StyleSheet.create({
  container: {
    width: SWidth,
    height: SHeight * 0.1,
    backgroundColor: 'rgb(156, 154, 214)',
    paddingHorizontal: SHeight * 0.02,
    // paddingTop: SHeight * 0.02,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTitle: {
    color: 'black',
    fontSize: 23,
    fontWeight: 'bold',
  },
});
