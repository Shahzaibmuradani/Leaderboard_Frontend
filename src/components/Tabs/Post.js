import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getPost} from '../../actions/post';
import Spinner from '../layout/Spinner';
import {StyleSheet, View, Dimensions, FlatList} from 'react-native';
import PostItem from './PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const SHeight = Dimensions.get('window').height;

const Post = ({getPost, post: {post, loading}, route, navigation}) => {
  useEffect(() => {
    getPost(route.params.id, route.params.type);
  }, [getPost]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <View style={styles.container}>
      <PostItem post={post} showActions={false} />
      <CommentForm
        postId={post._id}
        post_type={post.post_type}
        navigation={navigation}
      />
      <FlatList
        data={post.comments}
        showsVerticalScrollIndicator={false}
        keyExtractor={(comment) => comment._id}
        renderItem={({item}) =>
          item === null ? (
            <Spinner />
          ) : (
            <CommentItem
              comment={item}
              user_id={route.params.user_id}
              type={route.params.type}
              postId={post._id}
              navigation={navigation}
            />
          )
        }
      />
    </View>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, {getPost})(Post);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    marginBottom: SHeight * (5 / 100),
  },
});
