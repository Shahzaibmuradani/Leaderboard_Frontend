import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View, Text, StyleSheet} from 'react-native';
import {Content, Form, Textarea} from 'native-base';
import {Button} from 'react-native-paper';
import {addQueries} from '../../actions/help';
import Alert from '../layout/Alert';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AddHelp = ({addQueries}) => {
  const [formdata, setFormdata] = useState({
    questions: '',
    answers: '',
  });

  const {questions, answers} = formdata;

  const onChange = (name, value) => setFormdata({...formdata, [name]: value});

  const onSubmit = async () => {
    addQueries(formdata);
  };

  return (
    <>
      <Content padder style={{backgroundColor: '#FFF', padding: 20}}>
        <Form>
          <View style={styles.container}>
            <Text style={styles.sectionsub}>
              Support & Help{' '}
              <MaterialCommunityIcons name="help-circle" size={20} />
            </Text>
          </View>
          <Alert />
          <View style={styles.container1}>
            <Textarea
              rowSpan={2}
              bordered
              placeholder="Question"
              value={questions}
              onChangeText={(text) => onChange('questions', text)}
            />
            <View style={{paddingBottom: 8}}></View>
            <Textarea
              rowSpan={2}
              bordered
              placeholder="Answer"
              value={answers}
              onChangeText={(text) => onChange('answers', text)}
            />
            <Button
              mode="contained"
              color="#0C6CD5"
              style={styles.button}
              onPress={() => onSubmit()}>
              Add
            </Button>
          </View>
        </Form>
      </Content>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 8,
    alignItems: 'center',
  },
  container1: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 10,
  },
  sectionsub: {
    fontSize: 17,
    marginEnd: 12,
    marginBottom: 8,
    color: '#0C6CD5',
    fontWeight: 'bold',
  },
  button: {
    alignSelf: 'center',
    marginTop: 24,
    marginBottom: 14,
  },
});

AddHelp.propTypes = {
  addQueries: PropTypes.func.isRequired,
};

export default connect(null, {addQueries})(AddHelp);
