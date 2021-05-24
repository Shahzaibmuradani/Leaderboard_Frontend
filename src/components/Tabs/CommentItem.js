import React from 'react';
import {StyleSheet} from 'react-native';
import {Card, CardItem, Text, Left, Body, View} from 'native-base';
import {Avatar} from 'react-native-paper';
import moment from 'moment';

const CommentItem = ({comment: {_id, text, name, date}, postId}) => {
  return (
    <View>
      <Card style={styles.mb}>
        <CardItem bordered>
          <Left>
            <Avatar.Text
              size={40}
              label={name && name.substr(0, 1)}
              theme={{colors: {primary: '#0C6CD5'}}}
            />
            <Body>
              <Text>{name && name}</Text>
              <Text note>{moment(date).format('YYYY/MM/DD')}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          <Body>
            <Text>{text}</Text>
          </Body>
        </CardItem>
      </Card>
    </View>
  );
};

export default CommentItem;

const styles = StyleSheet.create({});
