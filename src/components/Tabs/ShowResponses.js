import React, {Fragment} from 'react';

import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {Card, CardItem, Left, Body} from 'native-base';
import moment from 'moment';
import UserAvatar from 'react-native-user-avatar';

const ShowResponses = ({
  response: {user, name, email, answers, date},
  navigation,
}) => {
  return (
    <View>
      <Card>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Profile', {
              _id: user,
              name: name,
              email: email,
            })
          }>
          <CardItem bordered>
            <Left>
              <UserAvatar size={40} name={name && name.charAt(0)} />
              <Body>
                <Text>{name && name}</Text>
                <Text note>{moment(date).format('YYYY/MM/DD')}</Text>
              </Body>
            </Left>
          </CardItem>
        </TouchableOpacity>
        <CardItem>
          <Body>
            <View>
              {answers &&
                answers.map((ans, index) => (
                  <Fragment key={index}>
                    <Text>Answer {index + 1}</Text>
                    <Text>{ans.text}</Text>
                  </Fragment>
                ))}
            </View>
          </Body>
        </CardItem>
      </Card>
    </View>
  );
};

export default ShowResponses;

// const styles = StyleSheet.create({});
