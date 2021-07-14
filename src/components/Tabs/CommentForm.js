import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createComment} from '../../redux/actions/post';
import {GreenColor, ThemeColor} from '../../utils/Constant';

const CommentForm = ({postId, post_type, createComment, navigation}) => {
  const [text, setText] = useState('');

  const onSubmit = async () => {
    createComment(postId, post_type, {text}, navigation);
    setText('');
  };
  return (
    <View>
      <TextInput
        mode="outlined"
        placeholder="Leave a Comment"
        multiline={true}
        value={text}
        onChangeText={(text) => setText(text)}
        style={{
          marginVertical: 4,
          marginHorizontal: 2,
        }}
        theme={{colors: {primary: ThemeColor}}}
      />
      <Button
        contentStyle={{flexDirection: 'row-reverse'}}
        style={[{marginTop: 6}, {alignSelf: 'center'}]}
        mode="contained"
        color={GreenColor}
        onPress={() => onSubmit()}>
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
