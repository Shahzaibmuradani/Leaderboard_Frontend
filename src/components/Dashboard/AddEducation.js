import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {
  View,
  Text,
  CheckBox,
  Container,
  Content,
  DatePicker,
} from 'native-base';
import {TextInput, Button} from 'react-native-paper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {addEducation} from '../../redux/actions/profile';
import Alert from '../layout/Alert';
import {GreenColor, ThemeColor, WhiteColor} from '../../utils/Constant';

const AddEducation = ({addEducation, navigation}) => {
  const [formData, setFormData] = useState({
    institute: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const {institute, degree, fieldofstudy, current, description} = formData;

  const onChange = (name, value) => setFormData({...formData, [name]: value});

  const onSubmit = () => {
    addEducation(formData, navigation);
  };
  return (
    <>
      <Container>
        <Content>
          <View
            style={[
              styles.container,
              {paddingHorizontal: 10, paddingVertical: 20},
            ]}>
            <View style={{marginBottom: 8}}>
              <View>
                <Text
                  style={[
                    {marginBottom: 10},
                    {marginLeft: 8},
                    {color: ThemeColor},
                    {fontSize: 20},
                  ]}>
                  Add An Education
                </Text>
                <Text style={[{marginBottom: 6}, {marginLeft: 8}]}>
                  <FontAwesome5Icon name="graduation-cap"></FontAwesome5Icon>
                  {'  '}Add any school, college or university that you have
                  attended.
                </Text>
              </View>
              <Alert />
            </View>
            <TextInput
              mode="outlined"
              placeholder="* Institute"
              style={[
                {marginTop: 5},
                {marginLeft: 8},
                {height: 28},
                {width: '90%'},
              ]}
              value={institute}
              onChangeText={(text) => onChange('institute', text)}
              theme={{colors: {primary: ThemeColor}}}
            />
            <TextInput
              mode="outlined"
              placeholder="* Degree or Certificate"
              style={[
                {marginTop: 6},
                {marginLeft: 8},
                {height: 28},
                {width: '90%'},
              ]}
              value={degree}
              onChangeText={(text) => onChange('degree', text)}
              theme={{colors: {primary: ThemeColor}}}
            />
            <TextInput
              mode="outlined"
              placeholder="* Field Of Study"
              style={[
                {marginTop: 6},
                {marginLeft: 8},
                {height: 28},
                {width: '90%'},
              ]}
              value={fieldofstudy}
              onChangeText={(text) => onChange('fieldofstudy', text)}
              theme={{colors: {primary: ThemeColor}}}
            />
            <DatePicker
              locale={'en'}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={'fade'}
              androidMode={'default'}
              placeHolderText="From Date"
              disabled={false}
              onDateChange={(date) => {
                setFormData({...formData, from: date});
              }}
            />
            <View style={styles.row}>
              <View style={styles.section}>
                <Text style={{marginLeft: 8}}>Current</Text>
                <CheckBox
                  style={{marginTop: 2}}
                  checked={current}
                  color={ThemeColor}
                  onPress={(e) => {
                    setFormData({...formData, current: !current});
                    toggleDisabled(!toDateDisabled);
                  }}
                />
              </View>
            </View>
            <DatePicker
              locale={'en'}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={'fade'}
              androidMode={'default'}
              placeHolderText="To Date"
              disabled={toDateDisabled ? true : false}
              onDateChange={(date) => {
                setFormData({...formData, to: date});
              }}
            />
            <TextInput
              mode="outlined"
              placeholder="Description"
              multiline={true}
              value={description}
              onChangeText={(text) => onChange('description', text)}
              style={[{width: '90%'}, {marginLeft: 8}]}
              theme={{colors: {primary: ThemeColor}}}
            />
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
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
});

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, {addEducation})(AddEducation);
