import React, {useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {log, login} from '../../actions/auth';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';

import {Button} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
import Alert from '../layout/Alert';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const Login = ({navigation, log, login, isAuthenticated}) => {
  const cardImage = require('../../img/connection.jpg');

  const [formdata, setFormdata] = useState({
    email: '',
    password: '',
  });

  const {email, password} = formdata;

  const onChange = (name, value) =>
    setFormdata({
      ...formdata,
      [name]: value,
    });

  const onSubmit = () => {
    login(email, password);
  };

  if (isAuthenticated) {
    log(navigation);
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
            <KeyboardAvoidingView behavior="position">
              <Image
                style={{
                  alignSelf: 'center',
                  height: '50%',
                  width: '100%',
                  marginBottom: 10,
                }}
                source={cardImage}></Image>
              <Alert></Alert>
              <TextInput
                autoCapitalize={'none'}
                placeholder="Email"
                style={styles.input}
                mode="outlined"
                theme={{colors: {primary: '#0C6CD5'}}}
                value={email}
                onChangeText={(text) => onChange('email', text)}></TextInput>
              <TextInput
                secureTextEntry={true}
                style={styles.input}
                placeholder="Password"
                theme={{colors: {primary: '#0C6CD5'}}}
                mode="outlined"
                value={password}
                onChangeText={(text) => onChange('password', text)}></TextInput>
              <Button
                mode="contained"
                style={styles.button}
                color="#0C6CD5"
                onPress={() => onSubmit()}>
                Login
              </Button>
              <TouchableOpacity>
                <Text
                  style={styles.sectionsub}
                  onPress={() => navigation.navigate('Register')}>
                  Don't have an account? Sign up
                </Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  text: {
    marginTop: 24,
    color: '#0C6CD5',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 26,
  },
  sectionContainer: {
    marginTop: 16,
    paddingHorizontal: 22,
    marginBottom: 32,
  },
  sectionsub: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0C6CD5',
    alignSelf: 'center',
  },
  input: {
    marginTop: 14,
    height: 40,
  },
  button: {
    alignSelf: 'center',
    marginTop: 24,
    marginBottom: 14,
    width: 140,
  },
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
  log: PropTypes.func,
  // isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {log, login})(Login);
