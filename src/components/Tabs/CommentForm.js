import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Caption, TextInput, Button} from 'react-native-paper';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createComment} from '../../actions/post';

const CommentForm = ({postId, post_type, createComment}) => {
  const [text, setText] = useState('');
  //const onChange = (name, value) => setFormData({...formData, [name]: value});
  return (
    <View>
      <TextInput
        mode="outlined"
        placeholder="Leave a Comment"
        multiline={true}
        value={text}
        onChangeText={(text) => setText(text)}
        style={{width: 330}}
        theme={{colors: {primary: '#0C6CD5'}}}
      />
      <Button
        contentStyle={{flexDirection: 'row-reverse'}}
        style={[{marginTop: 6}, {alignSelf: 'center'}]}
        mode="contained"
        color="green"
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
