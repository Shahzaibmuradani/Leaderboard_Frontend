import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createComment} from '../../actions/post';
import {GreenColor, ThemeColor} from '../../utils/Constant';

const CommentForm = ({postId, post_type, createComment}) => {
  const [text, setText] = useState('');
  return (
    <View>
      <TextInput
        mode="outlined"
        placeholder="Leave a Comment"
        multiline={true}
        value={text}
        onChangeText={(text) => setText(text)}
        style={{width: 330}}
        theme={{colors: {primary: ThemeColor}}}
      />
      <Button
        contentStyle={{flexDirection: 'row-reverse'}}
        style={[{marginTop: 6}, {alignSelf: 'center'}]}
        mode="contained"
        color={GreenColor}
        onPress={() => createComment(postId, post_type, {text})}>
        Add comment
      </Button>
    </View>
  );
};

CommentForm.propTypes = {
  createComment: PropTypes.func.isRequired,
};

export default connect(null, {createComment})(CommentForm);

// const styles = StyleSheet.create({});
