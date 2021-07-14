import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../redux/actions/profile';

import {Image, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Left,
  Body,
  View,
} from 'native-base';
import {Button} from 'react-native-paper';
import Spinner from '../layout/Spinner';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import DashboardActions from '../Dashboard/DashboardActions';
import ShowEducation from '../Dashboard/ShowEducation';
import ShowExperience from '../Dashboard/ShowExperience';
import UserAvatar from 'react-native-user-avatar';
import {
  ThemeColor,
  WhiteColor,
  LocationColor,
  BlackColor,
  BlueColor,
} from '../../utils/Constant';

const deviceWidth = Dimensions.get('window').width;
const cardImage = require('../../img/bg.jpg');

const Home = ({
  getCurrentProfile,
  auth: {user},
  profile: {profile, loading},
  navigation,
}) => {
  useEffect(() => {
    getCurrentProfile();
    profile;
  }, [getCurrentProfile, profile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Container style={styles.container}>
      {profile !== null ? (
        <>
          <Content padder style={{padding: 10}}>
            <View>
              <DashboardActions navigation={navigation} />
            </View>
            <Card style={styles.mb}>
              <CardItem bordered>
                <Left>
                  <UserAvatar size={40} name={user && user.name.charAt(0)} />
                  <Body>
                    <Text>Welcome {user && user.name}</Text>
                    <Text note>{user && user.email}</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem>
                <Body>
                  <Image
                    style={{
                      alignSelf: 'center',
                      height: 150,
                      resizeMode: 'cover',
                      width: deviceWidth / 1.18,
                      marginVertical: 5,
                    }}
                    source={cardImage}
                  />
                  {profile.bio && (
                    <Text note style={{fontWeight: 'bold', color: BlackColor}}>
                      Bio:
                      <Text note style={{color: BlueColor}}>
                        {' '}
                        {profile.bio}
                      </Text>
                    </Text>
                  )}
                  {profile.field && (
                    <Text note style={{fontWeight: 'bold', color: BlackColor}}>
                      Field:
                      <Text note style={{color: BlueColor}}>
                        {' '}
                        {profile.field}
                      </Text>
                    </Text>
                  )}
                  {profile.company && (
                    <Text note style={{fontWeight: 'bold', color: BlackColor}}>
                      Company:
                      <Text note style={{color: BlueColor}}>
                        {' '}
                        {profile.company}
                      </Text>
                    </Text>
                  )}
                  <Text
                    note
                    style={{
                      fontWeight: 'bold',
                      color: BlackColor,
                    }}>
                    Skills:
                    {profile.skills &&
                      profile.skills.map((skill, index) => (
                        <Text
                          style={{
                            color: BlueColor,
                          }}
                          note
                          key={index}>
                          {' '}
                          {skill}
                          {'  '}
                        </Text>
                      ))}
                  </Text>
                </Body>
              </CardItem>
              <CardItem bordered style={{borderTopWidth: 1}}>
                <Left>
                  <FontAwesome5Icon
                    color={LocationColor}
                    name="location-arrow"
                  />
                  <Text>
                    {profile.location && profile.location.toUpperCase()}
                  </Text>
                </Left>
              </CardItem>
            </Card>
            <View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View>
                  <Text
                    style={[
                      {color: ThemeColor},
                      {fontWeight: 'bold'},
                      {fontSize: 20},
                    ]}>
                    Education
                  </Text>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('AddEducation')}>
                    <FontAwesome5Icon
                      name="plus"
                      color={ThemeColor}
                      size={16}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {profile.education && profile.education.length > 0 ? (
                <>
                  {profile.education.map((education) => (
                    <ShowEducation
                      navigation={navigation}
                      key={education._id}
                      education={education}
                    />
                  ))}
                </>
              ) : (
                <View style={{marginBottom: 4}}>
                  <Text style={{fontSize: 14}}>No Education Credentials</Text>
                </View>
              )}
            </View>
            <View style={{marginTop: 6}}></View>
            <View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View>
                  <Text
                    style={[
                      {color: ThemeColor},
                      {fontWeight: 'bold'},
                      {fontSize: 20},
                    ]}>
                    Experience
                  </Text>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('AddExperience')}>
                    <FontAwesome5Icon
                      name="plus"
                      color={ThemeColor}
                      size={16}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {profile.experience && profile.experience.length > 0 ? (
                <>
                  {profile.experience.map((experience) => (
                    <ShowExperience
                      key={experience._id}
                      experience={experience}
                      navigation={navigation}
                    />
                  ))}
                </>
              ) : (
                <View style={{marginBottom: 4}}>
                  <Text style={{fontSize: 14}}>No Experience Credentials</Text>
                </View>
              )}
            </View>
          </Content>
        </>
      ) : (
        <>
          <Content>
            <View style={{margin: 30}}>
              <Text style={[{alignSelf: 'flex-start'}, {marginBottom: 8}]}>
                <FontAwesome5Icon name="user-alt"></FontAwesome5Icon> Welcome{' '}
                {user && user.name}
              </Text>
              <Text style={styles.text}>
                Please add some info to setup a profile
              </Text>
              <Button
                mode="contained"
                style={styles.button}
                color={ThemeColor}
                onPress={() => navigation.navigate('CreateProfile')}>
                Create Profile
              </Button>
            </View>
          </Content>
        </>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: WhiteColor,
  },
  text: {
    alignSelf: 'center',
    marginBottom: 7,
  },
  mb: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
});
Home.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {getCurrentProfile})(Home);
