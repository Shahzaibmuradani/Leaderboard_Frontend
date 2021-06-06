import React from 'react';
import {StyleSheet} from 'react-native';
import {Card, CardItem, Text, Left, Body, View} from 'native-base';
import moment from 'moment';
import UserAvatar from 'react-native-user-avatar';

const CommentItem = ({comment: {_id, text, name, date}, postId}) => {
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

export default MemoizedComment = React.memo(CommentItem);

const styles = StyleSheet.create({});
