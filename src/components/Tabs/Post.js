import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getPost} from '../../actions/post';
import Spinner from '../layout/Spinner';
import {StyleSheet, FlatList} from 'react-native';
import PostItem from './PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({getPost, post: {post, loading}, route}) => {
  useEffect(() => {
    getPost(route.params.id, route.params.type);
  }, [getPost]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} post_type={post.post_type} />
      <FlatList
        data={post.comments}
        showsVerticalScrollIndicator={false}
        keyExtractor={(comment) => comment._id}
        renderItem={({item}) =>
          item === null ? (
            <Spinner />
          ) : (
            <CommentItem comment={item} postId={post._id} />
          )
        }
      />
    </>
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

// const styles = StyleSheet.create({
//   text: {
//     alignSelf: 'center',
//     marginBottom: 7,
//   },
//   mb: {
//     marginBottom: 15,
//     borderRadius: 4,
//   },
//   button: {
//     marginStart: 'auto',
//     marginEnd: 'auto',
//     alignSelf: 'center',
//   },
//   row: {
//     marginTop: 5,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   section: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginStart: 220,
//   },
// });
