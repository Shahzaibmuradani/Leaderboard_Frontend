import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import Spinner from '../layout/Spinner';
import ShowEducation from '../Dashboard/ShowEducation';
import ShowExperience from '../Dashboard/ShowExperience';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Card, CardItem, Left, Body, Text} from 'native-base';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {getProfile} from '../../actions/profile';

const Profile = ({route, getProfile, getuser, navigation}) => {
  useEffect(() => {
    getProfile(route.params._id);
  }, [getProfile, route.params._id]);

  let objeducation = getuser.education && JSON.stringify(...getuser.education);
  objeducation = getuser.education && JSON.parse(objeducation);
  let objexperience =
    getuser.experience && JSON.stringify(...getuser.experience);
  objexperience = getuser.experience && JSON.parse(objexperience);

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <Card>
        <CardItem bordered>
          <Left>
            <UserAvatar
              size={40}
              name={route.params.name && route.params.name.charAt(0)}
            />
            <Body>
              <Text>{route.params.name && route.params.name}</Text>
              <Text note>{route.params.email && route.params.email}</Text>
            </Body>
          </Left>
        </CardItem>
        {getuser ? (
          <>
            <CardItem>
              <Body>
                {getuser.bio && (
                  <Text note style={{fontWeight: 'bold', color: 'black'}}>
                    Bio:
                    <Text note style={{color: 'blue'}}>
                      {' '}
                      {getuser.bio}
                    </Text>
                  </Text>
                )}
                {getuser.field && (
                  <Text note style={{fontWeight: 'bold', color: 'black'}}>
                    Field:
                    <Text note style={{color: 'blue'}}>
                      {' '}
                      {getuser.field}
                    </Text>
                  </Text>
                )}
                {getuser.company && (
                  <Text note style={{fontWeight: 'bold', color: 'black'}}>
                    Company:
                    <Text note style={{color: 'blue'}}>
                      {' '}
                      {getuser.company}
                    </Text>
                  </Text>
                )}
                <Text note style={{fontWeight: 'bold', color: 'black'}}>
                  Skills:
                  {getuser.skills &&
                    getuser.skills.map((skill, index) => (
                      <Text style={{color: 'blue'}} note key={index}>
                        {' '}
                        {skill}
                      </Text>
                    ))}
                </Text>
                {/* <Text>{JSON.stringify(getuser.education)}</Text>
                <Text>{JSON.stringify(getuser.experience)}</Text> */}
                <View style={{marginVertical: 8}}>
                  {objeducation && (
                    <ShowEducation
                      updateActions={false}
                      education={objeducation}
                      navigation={navigation}
                    />
                  )}
                  {objexperience && (
                    <ShowExperience
                      updateActions={false}
                      experience={objexperience}
                      navigation={navigation}
                    />
                  )}
                </View>

                {getuser.social && getuser.social.linkedin && (
                  <View style={{flexDirection: 'row', width: '100%'}}>
                    <View style={{width: '10%'}}>
                      <FontAwesome5Icon
                        color="#0e76a8"
                        size={22}
                        name="linkedin"></FontAwesome5Icon>
                    </View>
                    <View style={{width: '90%', paddingLeft: 4}}>
                      <Text>{getuser.social.linkedin}</Text>
                    </View>
                  </View>
                )}
                {getuser.social && getuser.social.twitter && (
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                    }}>
                    <View style={{width: '10%'}}>
                      <FontAwesome5Icon
                        color="#00acee"
                        size={22}
                        name="twitter"></FontAwesome5Icon>
                    </View>
                    <View style={{width: '90%', paddingLeft: 4}}>
                      <Text>{getuser.social.twitter}</Text>
                    </View>
                  </View>
                )}

                {getuser.social && getuser.social.facebook && (
                  <View style={{flexDirection: 'row', width: '100%'}}>
                    <View style={{width: '10%'}}>
                      <FontAwesome5Icon
                        color="#3b5998"
                        size={22}
                        name="facebook"></FontAwesome5Icon>
                    </View>
                    <View style={{width: '90%', paddingLeft: 4}}>
                      <Text>{getuser.social.facebook}</Text>
                    </View>
                  </View>
                )}
              </Body>
            </CardItem>
            <CardItem footer bordered>
              <Text note style={{color: 'black', fontWeight: 'bold'}}>
                Location:
              </Text>
              <Text note style={{color: 'blue', fontWeight: 'bold'}}>
                {' '}
                {getuser.location.toUpperCase()}
              </Text>
            </CardItem>
          </>
        ) : (
          <></>
        )}
      </Card>
    </View>
  );
  //);
};

Profile.propTypes = {
  getProfile: PropTypes.func.isRequired,
  getuser: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  getuser: state.profile.getuser,
});

// export default Profile;
export default connect(mapStateToProps, {getProfile})(Profile);
// export default MemoizedComment = connect(mapStateToProps, {getProfile})(
//   React.memo(Profile),
// );

// const styles = StyleSheet.create({})
