import React, {useEffect} from 'react';
import {View} from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import Spinner from '../layout/Spinner';
import ShowEducation from '../Dashboard/ShowEducation';
import ShowExperience from '../Dashboard/ShowExperience';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Card, CardItem, Left, Body, Text} from 'native-base';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {getProfile} from '../../actions/profile';
import {
  BlackColor,
  BlueColor,
  FacebookColor,
  LinkedinColor,
  TwitterColor,
  WhiteColor,
} from '../../utils/Constant';

const Profile = ({route, getProfile, getuser, navigation}) => {
  useEffect(() => {
    getProfile(route.params._id);
  }, [getProfile, route.params._id, getuser]);

  let objeducation =
    getuser && getuser.education && JSON.stringify(...getuser.education);
  objeducation = getuser && getuser.education && JSON.parse(objeducation);
  let objexperience =
    getuser && getuser.experience && JSON.stringify(...getuser.experience);
  objexperience = getuser && getuser.experience && JSON.parse(objexperience);

  return (
    <View style={{flex: 1, backgroundColor: WhiteColor}}>
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
                  <Text note style={{fontWeight: 'bold', color: BlackColor}}>
                    Bio:
                    <Text note style={{color: BlueColor}}>
                      {' '}
                      {getuser.bio}
                    </Text>
                  </Text>
                )}
                {getuser.field && (
                  <Text note style={{fontWeight: 'bold', color: BlackColor}}>
                    Field:
                    <Text note style={{color: BlueColor}}>
                      {' '}
                      {getuser.field}
                    </Text>
                  </Text>
                )}
                {getuser.company && (
                  <Text note style={{fontWeight: 'bold', color: BlackColor}}>
                    Company:
                    <Text note style={{color: BlueColor}}>
                      {' '}
                      {getuser.company}
                    </Text>
                  </Text>
                )}
                <Text note style={{fontWeight: 'bold', color: BlackColor}}>
                  Skills:
                  {getuser.skills &&
                    getuser.skills.map((skill, index) => (
                      <Text style={{color: BlueColor}} note key={index}>
                        {' '}
                        {skill}
                      </Text>
                    ))}
                </Text>
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
                        color={LinkedinColor}
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
                        color={TwitterColor}
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
                        color={FacebookColor}
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
              <Text note style={{color: BlackColor, fontWeight: 'bold'}}>
                Location:
              </Text>
              <Text note style={{color: BlueColor, fontWeight: 'bold'}}>
                {' '}
                {getuser.location.toUpperCase()}
              </Text>
            </CardItem>
          </>
        ) : (
          <Spinner />
        )}
      </Card>
    </View>
  );
  //);
};

Profile.propTypes = {
  getProfile: PropTypes.func.isRequired,
  getuser: PropTypes.object,
};

const mapStateToProps = (state) => ({
  getuser: state.profile.getuser,
});

export default MemoizedProfile = connect(mapStateToProps, {getProfile})(
  Profile,
);
