import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Card, CardItem, Text, Left, Body, View, Right} from 'native-base';
import moment from 'moment';
import UserAvatar from 'react-native-user-avatar';
import {DangerColor} from '../../utils/Constant';
import {deleteComment} from '../../redux/actions/post';
import {connect} from 'react-redux';

const CommentItem = ({
  deleteComment,
  comment: {_id, user, text, name, date},
  postId,
  user_id,
  type,
  navigation,
}) => {
  const onSubmit = async () => {
    deleteComment(postId, _id, type, navigation);
  };

  return (
    <View>
      <Card style={styles.mb}>
        <CardItem bordered>
          <Left>
            <UserAvatar size={40} name={name && name.charAt(0)} />
            <Body>
              <Text>{name && name}</Text>
              <Text note>{moment(date).format('YYYY/MM/DD')}</Text>
            </Body>
          </Left>
          {user && user === user_id && (
            <Right>
              <TouchableOpacity
                style={{flexDirection: 'row-reverse'}}
                onPress={() => onSubmit()}>
                <Text style={{color: DangerColor}}>Delete</Text>
              </TouchableOpacity>
            </Right>
          )}
        </CardItem>
        <CardItem>
          <Body>
            <Text>{text && text}</Text>
          </Body>
        </CardItem>
      </Card>
    </View>
  );
};

export default MemoizedComment = React.memo(
  connect(null, {deleteComment})(CommentItem),
);

const styles = StyleSheet.create({});
