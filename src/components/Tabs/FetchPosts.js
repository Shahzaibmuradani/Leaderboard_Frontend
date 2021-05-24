// import React, {useEffect} from 'react';
// import {StyleSheet, Text, View} from 'react-native';
// import {connect} from 'react-redux';
// import PropTypes from 'prop-types';
// import {getPosts} from '../../actions/post';
// import allPosts from './allPosts';

// const FetchPosts = ({getPosts, posts}) => {
//   useEffect(() => {
//     getPosts();
//     //posts;
//   }, [getPosts]);

//   return (
//     <View>
//       <allPosts/>
//     </View>
//   );
// };

// FetchPosts.propTypes = {
//   getPosts: PropTypes.func.isRequired,
//   posts: PropTypes.array.isRequired,
// };

// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   posts: state.post.posts,
// });

// export default connect(mapStateToProps, {getPosts})(FetchPosts);

// const styles = StyleSheet.create({});
