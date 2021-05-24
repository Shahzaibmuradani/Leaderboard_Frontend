import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../actions/profile';

import {Image, StyleSheet, Dimensions} from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  //Thumbnail,
  Left,
  Body,
  View,
} from 'native-base';
import {Button, Avatar} from 'react-native-paper';
import Spinner from '../layout/Spinner';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import DashboardActions from '../Dashboard/DashboardActions';
import ShowEducation from '../Dashboard/ShowEducation';
import ShowExperience from '../Dashboard/ShowExperience';
import {TouchableOpacity} from 'react-native-gesture-handler';

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
                  <Avatar.Text
                    size={40}
                    label={user.name.substr(0, 1)}
                    theme={{colors: {primary: '#0C6CD5'}}}
                  />
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
                  <View
                    style={{
                      width: '100%',
                      display: 'flex',
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View>
                      <Text style={{fontWeight: 'bold', fontSize: 16}} note>
                        Bio:
                      </Text>
                    </View>
                    <View style={{paddingLeft: 6}}>
                      <Text>{profile.bio}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      display: 'flex',
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View>
                      <Text style={{fontWeight: 'bold', fontSize: 16}} note>
                        Field:
                      </Text>
                    </View>
                    <View style={{paddingLeft: 6}}>
                      <Text>{profile.field}</Text>
                    </View>
                  </View>
                </Body>
              </CardItem>
              <CardItem bordered style={{borderTopWidth: 1}}>
                <Left>
                  <FontAwesome5Icon color="#0275d8" name="location-arrow" />
                  <Text>{profile.location.toUpperCase()}</Text>
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
                      {color: '#0C6CD5'},
                      {fontWeight: 'bold'},
                      {fontSize: 20},
                    ]}>
                    Education
                  </Text>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('AddEducation')}>
                    <FontAwesome5Icon name="plus" color="#0C6CD5" size={16} />
                  </TouchableOpacity>
                </View>
              </View>
              {profile.education.length > 0 ? (
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
                      {color: '#0C6CD5'},
                      {fontWeight: 'bold'},
                      {fontSize: 20},
                    ]}>
                    Experience
                  </Text>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('AddExperience')}>
                    <FontAwesome5Icon name="plus" color="#0C6CD5" size={16} />
                  </TouchableOpacity>
                </View>
              </View>
              {profile.experience.length > 0 ? (
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
                You have not yet setup a profile, please add some info
              </Text>
              <Button
                mode="contained"
                style={styles.button}
                color="#0C6CD5"
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
    backgroundColor: '#FFF',
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
