import React from 'react';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import {RedColor} from './Constant';

const Spinner = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={RedColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Spinner;
