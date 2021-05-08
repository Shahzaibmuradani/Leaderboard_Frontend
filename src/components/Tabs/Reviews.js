import React, {useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {View, Picker, StyleSheet, Text} from 'react-native';
import {Container, Content, Card, CardItem, Left, Body} from 'native-base';
import {Button, TextInput} from 'react-native-paper';
import {Something} from '../../actions/help';
import Alert from '../layout/Alert';

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
    //login(remarks);
    // console.log(remarks);

    // console.log('flag', flag);
    // console.log(route.params.id);
    Something(remarks, route.params.id, navigation);
    //console.log(remarks, route.params.id, navigation);
    // console.log(remarks, _id);
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
                        // style={styles.input}
                        mode="outlined"
                        theme={{colors: {primary: '#0C6CD5'}}}
                        label="Your Views"
                        value={remarks}
                        onChangeText={(text) =>
                          onChange('remarks', text)
                        }></TextInput>
                      {/* <Picker
                        mode="dropdown"
                        selectedValue={remarks}
                        style={{height: 50, width: 160}}
                        onValueChange={(itemValue, itemIndex) =>
                          onChange('remarks', itemValue)
                        }>
                        <Picker.Item label="May be" value={5} />
                        <Picker.Item label="Yes" value={10} />
                        <Picker.Item label="No" value={1} />
                      </Picker> */}
                    </View>
                  </Body>
                </Left>
              </CardItem>
              <CardItem style={styles.mb} footer bordered>
                <Button
                  mode="contained"
                  style={styles.text}
                  color="#0C6CD5"
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
    color: '#0C6CD5',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  text: {
    marginStart: 'auto',
    alignSelf: 'center',
    color: '#0C6CD5',
  },
  mb: {
    backgroundColor: '#E8EDF8',
  },
});

Reviews.propTypes = {
  Something: PropTypes.func.isRequired,
};

export default connect(null, {Something})(Reviews);
