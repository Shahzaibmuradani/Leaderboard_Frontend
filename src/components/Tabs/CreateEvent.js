import axios from 'axios';

import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {View, StyleSheet, Picker, Text} from 'react-native';
import {Caption, TextInput, Button} from 'react-native-paper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import Alert from '../layout/Alert';
import {createEvent, notify} from '../../redux/actions/post';
import {
  GreenColor,
  LinkedinColor,
  LinksColor,
  ThemeColor,
  WhiteColor,
} from '../../utils/Constant';

const CreateEvent = ({navigation, notify, createEvent}) => {
  const [formData, setFormData] = useState({
    text: '',
    field: 'Computer Science',
    location: '',
    email: '',
    post_type: 'event',
  });

  const {text, field, location, email} = formData;

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const onChange = (name, value) => setFormData({...formData, [name]: value});

  const onSubmit = async () => {
    createEvent(formData, navigation);
  };

  return (
    <View>
      <View>
        <Text
          style={[
            {marginBottom: 10},
            {alignSelf: 'center'},
            {color: ThemeColor},
            {fontSize: 22},
          ]}>
          Create Post
        </Text>
      </View>
      <Alert />
      <TextInput
        mode="outlined"
        placeholder="Whats in your mind"
        multiline={true}
        value={text}
        onChangeText={(text) => onChange('text', text)}
        style={{width: 330}}
        theme={{colors: {primary: ThemeColor}}}
      />
      <Picker
        selectedValue={field}
        mode="dropdown"
        onValueChange={(itemValue, itemIndex) => onChange('field', itemValue)}
        style={[{height: 50, width: 200}, {color: ThemeColor}]}>
        <Picker.Item label="Computer Science" value="Computer Science" />
        <Picker.Item label="BBA" value="BBA" />
        <Picker.Item label="Media Science" value="Media Science" />
      </Picker>
      <Caption style={[{fontSize: 14}, {alignSelf: 'flex-start'}]}>
        Select beneficial Field
      </Caption>
      <TextInput
        mode="outlined"
        placeholder="Location"
        value={location}
        onChangeText={(text) => onChange('location', text)}
        style={[{marginTop: 6}, {height: 28}, {width: 330}]}
        theme={{colors: {primary: ThemeColor}}}
      />
      <Caption style={[{fontSize: 14}, {alignSelf: 'flex-start'}]}>
        (eg. Karachi, Lahore)
      </Caption>
      <View style={styles.row}>
        <View style={styles.section}>
          <Button
            contentStyle={{flexDirection: 'row-reverse'}}
            style={{marginTop: 6}}
            mode="contained"
            color={LinksColor}
            onPress={() => toggleSocialInputs(!displaySocialInputs)}>
            Add email address
          </Button>
          <Text style={{marginLeft: 10, fontSize: 16}}>Optional</Text>
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
                name="envelope-square"></FontAwesome5Icon>
              <TextInput
                autoCapitalize="none"
                mode="outlined"
                placeholder="Email address"
                value={email}
                onChangeText={(text) => onChange('email', text)}
                style={[{marginTop: 6}, {height: 28}, {width: 250}]}
                theme={{colors: {primary: ThemeColor}}}
              />
            </View>
          </View>
        </View>
      )}
      <View style={{marginTop: 16}}></View>
      <Button
        contentStyle={{flexDirection: 'row-reverse'}}
        style={[{marginTop: 6}, {alignSelf: 'center'}]}
        mode="contained"
        color={GreenColor}
        onPress={() => onSubmit()}>
        Post
      </Button>
    </View>
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

CreateEvent.propTypes = {
  createEvent: PropTypes.func.isRequired,
};

export default connect(null, {notify, createEvent})(CreateEvent);
