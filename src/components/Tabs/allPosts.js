import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getPosts} from '../../actions/post';
import Spinner from '../layout/Spinner';
import {loadUser} from '../../actions/auth';
import PostItem from './PostItem';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {LightGrayColor, ThemeColor} from '../../utils/Constant';

const SHeight = Dimensions.get('window').height;

const allPosts = ({
  navigation,
  getPosts,
  post: {posts},
  loadUser,
  auth: {loading, user},
}) => {
  const [show, setShow] = useState('All');

  const updateShow = (s) => {
    setShow(s);
  };

  useEffect(() => {
    loadUser();
    getPosts();
    posts;
  }, [getPosts, loadUser, posts]);

  let filterPosts =
    show === 'job'
      ? posts.filter((post) => post.post_type === 'job')
      : show === 'event'
      ? posts.filter((post) => post.post_type === 'event')
      : show === 'relevant'
      ? posts.filter((post) => post.isRelevant === true)
      : show === 'toprated'
      ? posts.filter((post) =>
          post.reviews.map((remarks) => remarks.remarks >= 5),
        )
      : posts;

  return (
    <>
      {loading && user === null ? (
        <Spinner />
      ) : (
        <>
          <View style={styles.container}>
            <ScrollView
              contentContainerStyle={styles.childView}
              showsHorizontalScrollIndicator={false}
              horizontal
              style={styles.scrollView}>
              <TouchableOpacity onPress={() => updateShow('All')}>
                <Text style={styles.text}>#All</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => updateShow('job')}>
                <Text style={styles.text}>#job</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => updateShow('event')}>
                <Text style={styles.text}>#event</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => updateShow('relevant')}>
                <Text style={styles.text}>#relevant</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => updateShow('toprated')}>
                <Text style={styles.text}>#top rated</Text>
              </TouchableOpacity>
            </ScrollView>

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
    marginBottom: SHeight * (5 / 100),
  },
  childView: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scrollView: {
    alignSelf: 'center',
    width: '100%',
    height: SHeight * (6 / 100),
    backgroundColor: LightGrayColor,
    borderRadius: 50,
  },
  text: {
    marginHorizontal: 14,
    fontSize: 18,
    fontWeight: 'bold',
    color: ThemeColor,
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
