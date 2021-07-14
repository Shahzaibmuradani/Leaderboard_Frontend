import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addAnswers} from '../../redux/actions/post';
import {LightBlueColor} from '../../utils/Constant';

const Email = ({route, addAnswers, navigation}) => {
  return (
    <View>
      {route.params.email && (
        <View
          style={{
            height: '100%',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              alignItems: 'center',
              backgroundColor: LightBlueColor,
              height: '15%',
              justifyContent: 'center',
              width: '80%',
              borderRadius: 20,
            }}
            onPress={() => addAnswers([], route.params.postId, navigation)}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              Apply through Email or Website!
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              {route.params.email}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

Email.propTypes = {
  addAnswers: PropTypes.func.isRequired,
};

export default connect(null, {addAnswers})(Email);

const styles = StyleSheet.create({});
