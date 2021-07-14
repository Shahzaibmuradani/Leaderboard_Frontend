import React, {useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {log, login} from '../../redux/actions/auth';

import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';

import {Container, Content} from 'native-base';

import {Button} from 'react-native-paper';
// import {TextInput} from 'react-native-paper';
import Alert from '../layout/Alert';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {SHeight, SWidth, ThemeColor, WhiteColor} from '../../utils/Constant';
import {ScrollView} from 'react-native-gesture-handler';

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
    <ScrollView showsVerticalScrollIndicator={false} style={styles.mainView}>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>
          HearMeOut <FontAwesome5Icon name="bullhorn" size={26} />
        </Text>
      </View>
      <View style={styles.imageView}>
        <Image style={styles.logo} source={cardImage}></Image>
      </View>
      <Alert />
      <View style={styles.inputView}>
        <TextInput
          autoCapitalize={'none'}
          style={styles.emailInput}
          placeholder="Email"
          value={email}
          onChangeText={(text) => onChange('email', text)}
        />
        <TextInput
          secureTextEntry
          autoCapitalize={'none'}
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          onChangeText={(text) => onChange('password', text)}
        />
      </View>
      <View style={styles.loginView}>
        <TouchableOpacity style={styles.loginButton} onPress={() => onSubmit()}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={styles.RegisterText}
            onPress={() => navigation.navigate('Register')}>
            Don't have an account? Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: WhiteColor,
  },
  titleView: {
    height: SHeight * (15 / 100),
    justifyContent: 'center',
  },
  titleText: {
    color: ThemeColor,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 30,
  },
  imageView: {
    width: SWidth,
    height: SHeight * (28 / 100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: SHeight * (30 / 100),
    width: SWidth * (90 / 100),
    resizeMode: 'contain',
  },
  inputView: {
    justifyContent: 'center',
    width: SWidth * (90 / 100),
    height: SHeight * (20 / 100),
    alignSelf: 'center',
    margin: 10,
  },
  emailInput: {
    fontSize: 16,
    height: SHeight * (6 / 100),
    paddingLeft: 10,
    marginBottom: 25,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: ThemeColor,
  },
  passwordInput: {
    fontSize: 16,
    height: SHeight * (6 / 100),
    paddingLeft: 10,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: ThemeColor,
  },
  loginView: {
    justifyContent: 'center',
    height: SHeight * (30 / 100),
    alignItems: 'center',
  },
  loginButton: {
    justifyContent: 'center',
    borderRadius: 4,
    width: SWidth * (90 / 100),
    height: SHeight * (6 / 100),
    backgroundColor: ThemeColor,
  },
  loginText: {
    color: WhiteColor,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  RegisterText: {
    paddingTop: 10,
    fontSize: 16,
    color: ThemeColor,
    fontWeight: 'bold',
  },
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
  log: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {log, login})(Login);
