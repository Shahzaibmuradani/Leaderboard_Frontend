import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {FlatList} from 'react-native';
import PostItem from './PostItem';
import {getNotRelevant} from '../../actions/post';
import Spinner from '../layout/Spinner';

const Relevant = ({getNotRelevant, post: {postRelevants, loading}}) => {
  useEffect(() => {
    getNotRelevant();
  }, [getNotRelevant, postRelevants]);

  return loading || postRelevants === null ? (
    <Spinner />
  ) : (
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

// const styles = StyleSheet.create({});
