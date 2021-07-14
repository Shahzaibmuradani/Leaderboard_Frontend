import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {StyleSheet, Picker} from 'react-native';
import {Caption, TextInput, Button} from 'react-native-paper';
import {Container, View, Content, Text} from 'native-base';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {createProfile} from '../../redux/actions/profile';
import Alert from '../layout/Alert';
import {
  FacebookColor,
  GreenColor,
  LinkedinColor,
  LinksColor,
  ThemeColor,
  TwitterColor,
  WhiteColor,
} from '../../utils/Constant';

const CreateProfile = ({createProfile, navigation}) => {
  const [formData, setFormData] = useState({
    bio: '',
    field: 'Computer Science',
    skills: '',
    company: '',
    location: '',

    twitter: '',
    facebook: '',
    linkedin: '',
  });

  const {
    bio,
    field,
    skills,
    location,
    company,

    twitter,
    facebook,
    linkedin,
  } = formData;

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const onChange = (name, value) => setFormData({...formData, [name]: value});

  const onSubmit = async () => {
    console.log(navigation);
    console.log(formData);
    createProfile(formData, false, navigation);
  };

  return (
    <>
      <Container>
        <Content>
          <View style={{margin: 20}}>
            <View>
              <Text
                style={[
                  {marginBottom: 10},
                  {color: ThemeColor},
                  {fontSize: 20},
                ]}>
                Create Profile
              </Text>
              <Text style={{marginBottom: 6}}>
                <FontAwesome5Icon name="user-alt"></FontAwesome5Icon>
                {'  '}Let's make your profile stand out
              </Text>
              <Alert />
            </View>
            <TextInput
              mode="outlined"
              placeholder="Bio"
              multiline={true}
              value={bio}
              onChangeText={(text) => onChange('bio', text)}
              style={[{marginTop: 5}, {width: '90%'}]}
              theme={{colors: {primary: ThemeColor}}}
            />
            <Caption style={[{fontSize: 14}, {alignSelf: 'flex-start'}]}>
              About yourself
            </Caption>
            <Picker
              selectedValue={field}
              mode="dropdown"
              onValueChange={(itemValue, itemIndex) =>
                onChange('field', itemValue)
              }
              style={[{height: 50, width: '70%'}, {color: ThemeColor}]}>
              <Picker.Item label="Computer Science" value="Computer Science" />
              <Picker.Item label="BBA" value="BBA" />
              <Picker.Item label="Media Science" value="Media Science" />
            </Picker>
            <Caption style={[{fontSize: 14}, {alignSelf: 'flex-start'}]}>
              Your area domain
            </Caption>
            <TextInput
              mode="outlined"
              placeholder="* Skills"
              value={skills}
              multiline={true}
              onChangeText={(text) => onChange('skills', text)}
              style={[{marginTop: 6}, {height: 28}, {width: '90%'}]}
              theme={{colors: {primary: ThemeColor}}}
            />
            <Caption style={({fontSize: 14}, {alignSelf: 'flex-start'})}>
              (eg. HTML,CSS,PHP)
            </Caption>
            <TextInput
              mode="outlined"
              placeholder="Location"
              value={location}
              onChangeText={(text) => onChange('location', text)}
              style={[{marginTop: 6}, {height: 28}, {width: '90%'}]}
              theme={{colors: {primary: ThemeColor}}}
            />
            <Caption style={[{fontSize: 14}, {alignSelf: 'flex-start'}]}>
              (eg. Boston, New York)
            </Caption>
            <TextInput
              mode="outlined"
              placeholder="Company"
              value={company}
              onChangeText={(text) => onChange('company', text)}
              style={[{marginTop: 6}, {height: 28}, {width: '90%'}]}
              theme={{colors: {primary: ThemeColor}}}
            />
            <Caption style={[{fontSize: 14}, {alignSelf: 'flex-start'}]}>
              Company or work
            </Caption>
            <View style={styles.row}>
              <View style={styles.section}>
                <Button
                  contentStyle={{flexDirection: 'row-reverse'}}
                  style={{marginTop: 6}}
                  mode="contained"
                  color={LinksColor}
                  onPress={() => toggleSocialInputs(!displaySocialInputs)}>
                  Add Social Network Links
                </Button>
                <Text style={{marginLeft: 10}}>Optional</Text>
              </View>
            </View>
            {displaySocialInputs && (
              <View>
                <View style={styles.row}>
                  <View style={styles.section}>
                    <FontAwesome5Icon
                      color={LinkedinColor}
                      size={22}
                      style={[{marginTop: 8}, {marginRight: 8}]}
                      name="linkedin"></FontAwesome5Icon>
                    <TextInput
                      mode="outlined"
                      placeholder="Linkedin URL"
                      value={linkedin}
                      onChangeText={(text) => onChange('linkedin', text)}
                      style={[{marginTop: 6}, {height: 28}, {width: 250}]}
                      theme={{colors: {primary: ThemeColor}}}
                    />
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.section}>
                    <FontAwesome5Icon
                      color={TwitterColor}
                      size={22}
                      style={[{marginTop: 8}, {marginRight: 8}]}
                      name="twitter"></FontAwesome5Icon>
                    <TextInput
                      mode="outlined"
                      placeholder="Twitter URL"
                      value={twitter}
                      onChangeText={(text) => onChange('twitter', text)}
                      style={[{marginTop: 6}, {height: 28}, {width: 250}]}
                      theme={{colors: {primary: ThemeColor}}}
                    />
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.section}>
                    <FontAwesome5Icon
                      color={FacebookColor}
                      size={22}
                      style={[{marginTop: 8}, {marginRight: 8}]}
                      name="facebook"></FontAwesome5Icon>
                    <TextInput
                      mode="outlined"
                      placeholder="Facebook URL"
                      value={facebook}
                      onChangeText={(text) => onChange('facebook', text)}
                      style={[{marginTop: 6}, {height: 28}, {width: 250}]}
                      theme={{colors: {primary: ThemeColor}}}
                    />
                  </View>
                </View>
              </View>
            )}
            <View style={{marginTop: 8}}></View>
            <Button
              contentStyle={{flexDirection: 'row-reverse'}}
              style={[{marginTop: 6}, {alignSelf: 'center'}]}
              mode="contained"
              color={GreenColor}
              onPress={() => onSubmit()}>
              Submit
            </Button>
          </View>
        </Content>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: WhiteColor,
  },
  row: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
});

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, {createProfile})(CreateProfile);
