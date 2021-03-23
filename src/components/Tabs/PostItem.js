import React, {useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  Card,
  CardItem,
  Text,
  Thumbnail,
  Left,
  Body,
  View,
  Right,
} from 'native-base';
import {Avatar, Button} from 'react-native-paper';
import moment from 'moment';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
//import Apply from './Apply';

const PostItem = ({
  navigation,
  user,
  post: {_id, name, avatar, text, faqs, reviews, post_type, date},
}) => {
  const onSave = async () => {
    navigation.navigate('NewPost');
  };
  return (
    <>
      <Card style={styles.mb}>
        <CardItem bordered>
          <Left>
            <Avatar.Text
              size={40}
              label={name.substr(0, 1)}
              theme={{colors: {primary: '#0C6CD5'}}}
            />
            <Body>
              <Text>{name}</Text>
              <Text note>{moment(date).format('YYYY/MM/DD')}</Text>
            </Body>
          </Left>
          <Right>
            <Text style={{color: 'green'}}>Applied</Text>
          </Right>
        </CardItem>
        <CardItem>
          <Body>
            <Text>{text}</Text>
            <Text style={{fontWeight: 'bold', color: '#0C6CD5'}}>
              #{post_type}
            </Text>
          </Body>
        </CardItem>
        <CardItem footer bordered>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Left>
              <TouchableOpacity>
                <Text>
                  <FontAwesome5Icon name="thumbs-up" size={15} /> Like
                </Text>
              </TouchableOpacity>
            </Left>
            <Body>
              <TouchableOpacity>
                <Text>
                  <FontAwesome5Icon name="comment-dots" size={15} /> Comment
                </Text>
              </TouchableOpacity>
            </Body>
            <Right>
              <TouchableOpacity>
                <Text>
                  <FontAwesome5Icon name="arrow-circle-right" size={15} /> Apply
                </Text>
              </TouchableOpacity>
            </Right>
          </View>
        </CardItem>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    alignSelf: 'center',
    marginBottom: 7,
  },
  mb: {
    marginBottom: 15,
    flex: 1,
    borderRadius: 4,
  },
  button: {
    marginStart: 'auto',
    marginEnd: 'auto',
    alignSelf: 'center',
  },
  row: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginStart: 220,
  },
});

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
};

export default connect(null, {})(PostItem);
