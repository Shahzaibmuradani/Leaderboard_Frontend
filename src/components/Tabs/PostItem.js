import React, {useState, useEffect, Fragment} from 'react';
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
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {addLike, removeLike} from '../../actions/post';
//import Apply from './Apply';

const PostItem = ({
  addLike,
  removeLike,
  navigation,
  user,
  //id,
  post: {
    _id,
    name,
    //avatar,
    text,
    likes,
    location,
    email,
    field,
    //  comments,
    faqs,
    reviews,
    post_type,
    date,
  },
}) => {
  const [check, setCheck] = useState(false);

  // const checkcolor = () => {
  //   likes.map((like) => like.user === user._id ?
  //   (
  //     setCheck(!check)
  //   )
  //      :
  //   (
  //     setCheck(!check)
  //   )
  //   )
  // }

  const onSubmit = async (_id, flag) => {
    if (flag) {
      addLike(_id);
    } else {
      removeLike(_id);
    }
  };
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
          <Right>
            {!check ? <Text style={{color: 'green'}}>Applied</Text> : <></>}
          </Right>
        </CardItem>
        <CardItem>
          <Body>
            <Text>{text}</Text>
            <Text style={{fontWeight: 'bold', color: '#0C6CD5'}}>
              #{post_type} #{field.toLowerCase()} #
              {location && location.toLowerCase()}
            </Text>
            <Text>
              {email && <Text>email us your CVs at {email.toLowerCase()}</Text>}
            </Text>
          </Body>
        </CardItem>
        <CardItem footer bordered>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
            }}>
            <Left>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginHorizontal: 8,
                    }}>
                    {likes.map((like) =>
                      like.user === user._id ? setCheck(true) : setCheck(false),
                    )}
                    <AntDesign
                      name="like1"
                      onPress={() => onSubmit(_id, setCheck(!check))}
                      size={15}
                      color={check ? 'blue' : 'black'}
                    />
                    {likes.length > 0 && <Text> {likes.length}</Text>}
                  </View>
                </TouchableOpacity>
                {/* <TouchableOpacity>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginHorizontal: 8,
                    }}>
                    <AntDesign
                      name="dislike1"
                      onPress={() => removeLike(_id)}
                      size={15}
                    />
                  </View>
                </TouchableOpacity> */}
              </View>
            </Left>
            <Body>
              <TouchableOpacity>
                <Text>
                  <FontAwesome name="commenting" size={15} /> Comment
                </Text>
              </TouchableOpacity>
            </Body>
            <Right>
              {faqs &&
                faqs.length > 0 &&
                faqs.map((faq, index) =>
                  faq.user === user._id ? (
                    <Fragment key={index}>
                      {setCheck(!check)}
                      {reviews.some((review) => review.user === user._id) ? (
                        <Text style={{color: 'green'}}>Reviewed</Text>
                      ) : (
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('Reviews', {
                              id: _id,
                            })
                          }>
                          <View
                            style={{flexDirection: 'row', marginHorizontal: 8}}>
                            <Text>
                              <FontAwesome
                                name="arrow-circle-right"
                                size={15}
                              />{' '}
                              Review
                            </Text>
                          </View>
                        </TouchableOpacity>
                      )}
                    </Fragment>
                  ) : (
                    <Fragment key={index}>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('Apply')}>
                        <View
                          style={{flexDirection: 'row', marginHorizontal: 8}}>
                          <Text>
                            <FontAwesome name="arrow-circle-right" size={15} />{' '}
                            Apply
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </Fragment>
                  ),
                )}
            </Right>
          </View>
        </CardItem>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    alignSelf: 'center',
    marginBottom: 7,
  },
  mb: {
    marginBottom: 15,
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
  user: PropTypes.object,
  // createLike:PropTypes.func.isRequired,
};

export default connect(null, {
  addLike,
  removeLike,
})(PostItem);
