import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {View, StyleSheet, FlatList, Dimensions} from 'react-native';
import PostItem from './PostItem';
import {getNotRelevant} from '../../redux/actions/post';
import Spinner from '../layout/Spinner';
const SHeight = Dimensions.get('window').height;

const Relevant = ({getNotRelevant, post: {postRelevants, loading}}) => {
  useEffect(() => {
    getNotRelevant();
  }, [getNotRelevant, postRelevants]);

  return loading || postRelevants === null ? (
    <Spinner />
  ) : (
    <View style={styles.container}>
      <FlatList
        data={postRelevants}
        showsVerticalScrollIndicator={false}
        keyExtractor={(postRelevants) => postRelevants._id}
        renderItem={({item}) => (
          <PostItem
            post={item}
            adminActions={true}
            showActions={false}
            showApplied={false}
          />
        )}
      />
    </View>
  );
};

Relevant.propTypes = {
  getNotRelevant: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, {getNotRelevant})(Relevant);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
  },
});
