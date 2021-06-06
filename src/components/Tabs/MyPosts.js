import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {StyleSheet, Text, View, FlatList} from 'react-native';
import {getMyposts} from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';

const MyPosts = ({
  getMyposts,
  post: {myposts, loading},
  auth: {user},
  navigation,
}) => {
  useEffect(() => {
    if (user.status === 'Recruiter') {
      getMyposts('job');
    } else if (user.status === 'Organizer') {
      getMyposts('event');
    }
  }, [getMyposts, myposts]);

  return loading || myposts === null ? (
    <Spinner />
  ) : (
    <FlatList
      data={myposts}
      showsVerticalScrollIndicator={false}
      keyExtractor={(myposts) => myposts._id}
      renderItem={({item}) => (
        <PostItem
          navigation={navigation}
          post={item}
          viewResponse={true}
          adminActions={false}
          showActions={false}
          showApplied={false}
        />
      )}
    />
  );
};

MyPosts.propTypes = {
  getMyposts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, {getMyposts})(MyPosts);

//const styles = StyleSheet.create({});
