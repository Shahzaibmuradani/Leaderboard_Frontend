import React, {useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {View, Picker, StyleSheet, Text} from 'react-native';
import {Container, Content, Card, CardItem, Left, Body} from 'native-base';
import {Button, TextInput} from 'react-native-paper';
import {Something} from '../../redux/actions/help';
import Alert from '../layout/Alert';
import {BlackColor, CardColor, ThemeColor} from '../../utils/Constant';

const Reviews = ({route, Something, navigation}) => {
  const [formdata, setFormdata] = useState({
    remarks: '',
  });

  const {remarks} = formdata;

  const onChange = (name, value) =>
    setFormdata({
      ...formdata,
      [name]: value,
    });

  const onSubmit = async () => {
    Something(remarks, route.params.id, navigation);
  };

  return (
    <>
      <Container>
        <Content>
          <View style={{padding: 30}}>
            <Alert />
            <Card>
              <CardItem style={styles.mb}>
                <Text style={styles.sectionTitle}>Give Your Review</Text>
              </CardItem>
              <CardItem style={styles.mb} bordered>
                <Left>
                  <Body>
                    <View>
                      <Text style={styles.sectionsub}>
                        Was this Post Helpful?
                      </Text>
                      <TextInput
                        autoCapitalize={'none'}
                        mode="outlined"
                        theme={{colors: {primary: ThemeColor}}}
                        placeholder="Your Views"
                        value={remarks}
                        onChangeText={(text) =>
                          onChange('remarks', text)
                        }></TextInput>
                    </View>
                  </Body>
                </Left>
              </CardItem>
              <CardItem style={styles.mb} footer bordered>
                <Button
                  mode="contained"
                  style={styles.text}
                  color={ThemeColor}
                  onPress={() => onSubmit()}>
                  Add
                </Button>
              </CardItem>
            </Card>
          </View>
        </Content>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
  },
  sectionsub: {
    fontSize: 17,
    marginEnd: 12,
    fontWeight: '600',
    color: ThemeColor,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: BlackColor,
  },
  text: {
    marginStart: 'auto',
    alignSelf: 'center',
    color: ThemeColor,
  },
  mb: {
    backgroundColor: CardColor,
  },
});

Reviews.propTypes = {
  Something: PropTypes.func.isRequired,
};

export default connect(null, {Something})(Reviews);
