import React, {useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Picker,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';

import {Button} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
import {register} from '../../actions/auth';
import {setAlert} from '../../actions/alert';
import Alert from '../layout/Alert';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {
  DangerColor,
  GreenColor,
  ThemeColor,
  WhiteColor,
} from '../../utils/Constant';

const Register = ({navigation, setAlert, register, isAuthenticated}) => {
  // const [errortoast, setErrortoast] = useState(false);
  // const cardImage = require('../../img/connection.jpg');

  const [formdata, setFormdata] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    status: 'Student',
  });

  const {name, email, password, password2, status} = formdata;

  const onChange = (name, value) =>
    setFormdata({
      ...formdata,
      [name]: value,
    });

  const onSubmit = async () => {
    if (password !== password2) {
      setErrortoast(true);
      setAlert('Password does not Match', `${DangerColor}`);
    } else {
      register({name, email, password, status});
    }
  };

  if (isAuthenticated) {
    return <>{navigation.navigate('AppDrawerScreen')}</>;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>
            HearMeOut <FontAwesome5Icon name="bullhorn" size={24} />
          </Text>
        </View>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionsubtitle}>Create New Account</Text>
            <KeyboardAvoidingView behavior="position">
              <Alert></Alert>
              <Picker
                selectedValue={status}
                mode="dropdown"
                onValueChange={(itemValue, itemIndex) =>
                  onChange('status', itemValue)
                }
                style={{
                  height: 50,
                  width: 200,
                  color: ThemeColor,
                  fontSize: 20,
                }}>
                <Picker.Item label="Student" value="Student" />
                <Picker.Item label="Organizer" value="Organizer" />
                <Picker.Item label="Recruiter" value="Recruiter" />
              </Picker>
              <TextInput
                style={styles.input}
                mode="outlined"
                theme={{colors: {primary: ThemeColor}}}
                label="Name"
                value={name}
                onChangeText={(text) => onChange('name', text)}></TextInput>
              <TextInput
                autoCapitalize={'none'}
                style={styles.input}
                mode="outlined"
                theme={{colors: {primary: ThemeColor}}}
                label="Email"
                value={email}
                onChangeText={(text) => onChange('email', text)}></TextInput>
              <TextInput
                secureTextEntry={true}
                style={styles.input}
                label="Password"
                theme={{colors: {primary: ThemeColor}}}
                mode="outlined"
                value={password}
                onChangeText={(text) => onChange('password', text)}></TextInput>
              <TextInput
                secureTextEntry={true}
                style={styles.input}
                label="Confirm Password"
                theme={{colors: {primary: ThemeColor}}}
                mode="outlined"
                value={password2}
                onChangeText={(text) =>
                  onChange('password2', text)
                }></TextInput>
              <Button
                mode="contained"
                style={styles.button}
                color={GreenColor}
                onPress={() => onSubmit()}>
                Register
              </Button>
              <TouchableOpacity>
                <Text
                  style={styles.sectionsubtitle}
                  onPress={() => navigation.navigate('Login')}>
                  Already have an account? Sign in
                </Text>
              </TouchableOpacity>

              {/* {errortoast ? (
            // ToastAndroid.showWithGravityAndOffset(
            //   'Password does not Match',
            //   ToastAndroid.LONG,
            //   ToastAndroid.BOTTOM,
            //   25,
            //   50,
            // )
            
          ) : (
            <></>
          )} */}
            </KeyboardAvoidingView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: WhiteColor,
    flex: 1,
  },
  text: {
    marginTop: 24,
    color: ThemeColor,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 26,
  },
  sectionContainer: {
    marginTop: 20,
    paddingHorizontal: 22,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: 'black',
    textAlign: 'center',
  },
  sectionsubtitle: {
    fontSize: 18,
    fontWeight: '700',
    color: ThemeColor,
    marginBottom: 14,
    alignSelf: 'center',
  },
  input: {
    marginTop: 14,
    height: 45,
  },
  button: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 14,
    width: 140,
  },
});

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {setAlert, register})(Register);
