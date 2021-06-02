import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import {getProfile} from '../../actions/profile';
import Spinner from '../layout/Spinner';
import ShowEducation from '../Dashboard/ShowEducation';
import ShowExperience from '../Dashboard/ShowExperience';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const Profile = ({
  getProfile,
  route,
  profile: {profile, loading},
  navigation,
}) => {
  useEffect(() => {
    getProfile(route.params._id);
  }, [getProfile, route.params._id, profile]);
  return profile === null || loading ? (
    <Spinner />
  ) : (
    <View>
      <Text>{route.params.name && route.params.name}</Text>
      <UserAvatar
        size={40}
        name={route.params.name && route.params.name.charAt(0)}
      />
      <Text>{profile.skills && profile.skills}</Text>
    </View>
  );
};

Profile.propTypes = {
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {getProfile})(Profile);

// const styles = StyleSheet.create({})
