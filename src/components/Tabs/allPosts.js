import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getPosts} from '../../actions/post';
import Spinner from '../layout/Spinner';
import {loadUser} from '../../actions/auth';
import PostItem from './PostItem';
import {StyleSheet, FlatList, View, Text, TouchableOpacity} from 'react-native';
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

  const [show, setShow] = useState('All');

  // const filterResultsByCondition = (condition) => {
  //   return posts.filter((post) => post.post_type === condition);
  // };

  const updateShow = (s) => {
    setShow(s);
  };

  let filterPosts =
    show === 'job'
      ? posts.filter((post) => post.post_type === 'job')
      : show === 'event'
      ? posts.filter((post) => post.post_type === 'event')
      : posts;

  return (
    <>
      {loading && user === null ? (
        <Spinner />
      ) : (
        <>
          <View style={styles.container}>
            <View
              style={{
                height: 40,
                backgroundColor: 'lightgray',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                borderRadius: 50,
                marginBottom: 6,
              }}>
              <View style={{width: '20%'}}>
                <TouchableOpacity onPress={() => updateShow('All')}>
                  <Text
                    style={{
                      color: '#0C6CD5',
                      fontSize: 16,
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    #All
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{width: '20%'}}>
                <TouchableOpacity onPress={() => updateShow('job')}>
                  <Text
                    style={{
                      color: '#0C6CD5',
                      fontSize: 16,
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    #job
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{width: '20%'}}>
                <TouchableOpacity onPress={() => updateShow('event')}>
                  <Text
                    style={{
                      color: '#0C6CD5',
                      fontSize: 16,
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    #event
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {filterPosts ? (
              <FlatList
                data={filterPosts}
                showsVerticalScrollIndicator={false}
                keyExtractor={(filterPosts) => filterPosts._id}
                renderItem={({item}) => (
                  <PostItem post={item} user={user} navigation={navigation} />
                )}
              />
            ) : (
              <Spinner />
            )}
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
  posts: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, {loadUser, getPosts})(allPosts);
