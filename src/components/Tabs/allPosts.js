import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getPosts} from '../../actions/post';
import Spinner from '../layout/Spinner';
import {loadUser} from '../../actions/auth';
import PostItem from './PostItem';
import {StyleSheet, FlatList, View} from 'react-native';
//import {Container, Content} from 'native-base';

const allPosts = ({
  navigation,
  getPosts,
  post: {posts},
  loadUser,
  auth: {loading, user},
}) => {
  useEffect(() => {
    loadUser();
    getPosts();
    posts;
  }, [getPosts, loadUser, posts]);

  return (
    <>
      {loading && user === null ? (
        <Spinner />
      ) : (
        <>
          <View style={styles.container}>
            <FlatList
              data={posts}
              showsVerticalScrollIndicator={false}
              keyExtractor={(post) => post._id}
              renderItem={({item}) => (
                <PostItem post={item} user={user} navigation={navigation} />
              )}
            />
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    flex: 1,
  },
});

allPosts.propTypes = {
  loadUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, {loadUser, getPosts})(allPosts);
