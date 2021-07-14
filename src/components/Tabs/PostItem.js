import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {StyleSheet, TouchableOpacity} from 'react-native';
import {Card, CardItem, Text, Left, Body, View, Right} from 'native-base';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {
  addLike,
  allowRelevant,
  deleteIrrelevant,
  removeLike,
} from '../../redux/actions/post';
import UserAvatar from 'react-native-user-avatar';
import Responses from './Responses';
import {GreenColor, RedColor, ThemeColor} from '../../utils/Constant';

const PostItem = ({
  addLike,
  removeLike,
  allowRelevant,
  deleteIrrelevant,
  navigation,
  user,
  post: {
    _id,
    name,
    //avatar,
    text,
    likes,
    location,
    email,
    field,
    test,
    responses,
    reviews,
    post_type,
    date,
  },
  showApplied,
  showActions,
  adminActions,
  viewResponse,
}) => {
  return (
    <View>
      {/* <TouchableOpacity
        onPress={() => navigation.navigate('Post', {id: _id, type: post_type})}> */}
      <Card style={styles.mb}>
        <CardItem bordered>
          <Left>
            <UserAvatar size={40} name={name && name.charAt(0)} />
            <Body>
              <Text>{name && name}</Text>
              <Text note>{moment(date).format('YYYY/MM/DD')}</Text>
            </Body>
          </Left>
          <Right>
            {
              <Text>
                {responses &&
                user &&
                responses.length > 0 &&
                responses.some((response) => response.user === user._id) &&
                showApplied ? (
                  <Text style={{color: GreenColor}}>Applied</Text>
                ) : (
                  <></>
                )}
              </Text>
            }
          </Right>
        </CardItem>
        <CardItem>
          <Body>
            <Text>{text}</Text>
            <Text style={{fontWeight: 'bold', color: ThemeColor}}>
              #{post_type && post_type} #{field && field.toLowerCase()} #
              {location && location.toLowerCase()}
            </Text>
            <Text>
              {email && <Text>email us your CVs at {email.toLowerCase()}</Text>}
            </Text>
          </Body>
        </CardItem>
        <CardItem footer bordered>
          {adminActions && (
            <View
              style={{
                display: 'flex',
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <View>
                <TouchableOpacity onPress={() => allowRelevant(_id, post_type)}>
                  <Text style={{color: GreenColor}}>Allowed</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => deleteIrrelevant(_id, post_type)}>
                  <Text style={{color: RedColor}}>Not allowed</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {showActions && (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
              }}>
              <Left>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TouchableOpacity onPress={() => addLike(_id, post_type)}>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginHorizontal: 8,
                        alignItems: 'center',
                      }}>
                      <View>
                        <AntDesign name="like1" size={15} />
                      </View>
                      {likes && likes.length > 0 && (
                        <View>
                          <Text>{likes.length}</Text>
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => removeLike(_id, post_type)}>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginHorizontal: 8,
                      }}>
                      <AntDesign name="dislike1" size={15} />
                    </View>
                  </TouchableOpacity>
                </View>
              </Left>
              <Body>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Post', {
                      id: _id,
                      type: post_type,
                      user_id: user._id,
                    })
                  }>
                  <Text>
                    <FontAwesome name="commenting" size={15} /> Comment
                  </Text>
                </TouchableOpacity>
              </Body>
              <Right>
                {post_type === 'job' &&
                  (responses === undefined || responses.length == 0 ? (
                    <Fragment>
                      {test === undefined || test.length == 0 ? (
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('Email', {
                              postId: _id,
                              email: email,
                            })
                          }>
                          <Text>
                            {' '}
                            <FontAwesome
                              name="arrow-circle-right"
                              size={15}
                            />{' '}
                            Apply
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('Apply', {
                              postId: _id,
                              test: test,
                            })
                          }>
                          <View
                            style={{
                              flexDirection: 'row',
                              marginHorizontal: 8,
                            }}>
                            <Text>
                              <FontAwesome
                                name="arrow-circle-right"
                                size={15}
                              />{' '}
                              Apply
                            </Text>
                          </View>
                        </TouchableOpacity>
                      )}
                    </Fragment>
                  ) : responses &&
                    user &&
                    responses.length > 0 &&
                    responses.some((response) => response.user === user._id) ? (
                    reviews &&
                    reviews.some((review) => review.user === user._id) ? (
                      <Text style={{color: GreenColor}}>Reviewed</Text>
                    ) : (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('Reviews', {
                            id: _id,
                          })
                        }>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginHorizontal: 8,
                          }}>
                          <Text>
                            <FontAwesome name="arrow-circle-right" size={15} />{' '}
                            Review
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )
                  ) : (
                    <Fragment>
                      {test === undefined || test.length == 0 ? (
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('Email', {
                              postId: _id,
                              email: email,
                            })
                          }>
                          <Text>
                            {' '}
                            <FontAwesome
                              name="arrow-circle-right"
                              size={15}
                            />{' '}
                            Apply
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('Apply', {
                              postId: _id,
                              test: test,
                            })
                          }>
                          <View
                            style={{
                              flexDirection: 'row',
                              marginHorizontal: 8,
                            }}>
                            <Text>
                              <FontAwesome
                                name="arrow-circle-right"
                                size={15}
                              />{' '}
                              Apply
                            </Text>
                          </View>
                        </TouchableOpacity>
                      )}
                    </Fragment>
                  ))}
                {post_type === 'event' && (
                  <Fragment>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginHorizontal: 8,
                      }}>
                      <Text>
                        <FontAwesome name="arrow-circle-left" size={15} /> Apply
                      </Text>
                    </View>
                  </Fragment>
                )}
              </Right>
            </View>
          )}
        </CardItem>
      </Card>
      {viewResponse && post_type === 'job' && (
        <Responses responses={responses} navigation={navigation} />
      )}
      {/* </TouchableOpacity> */}
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

PostItem.defaultProps = {
  showApplied: true,
  showActions: true,
  adminActions: false,
  viewResponse: false,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  user: PropTypes.object,
  allowRelevant: PropTypes.func.isRequired,
  deleteIrrelevant: PropTypes.func.isRequired,
  // createLike:PropTypes.func.isRequired,
};

export default connect(null, {
  addLike,
  removeLike,
  allowRelevant,
  deleteIrrelevant,
})(PostItem);
