import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ResponseAction = ({navigation}) => {
  return (
    <View>
      <TouchableOpacity onPress={() => console.log(navigation)}>
        <Text>pressed</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResponseAction;

// const styles = StyleSheet.create({});
