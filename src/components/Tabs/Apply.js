import React, {Fragment, useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {Button} from 'react-native-paper';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addAnswers} from '../../redux/actions/post';
import {
  BlackColor,
  GreenColor,
  LightBlueColor,
  ThemeColor,
} from '../../utils/Constant';

const Apply = ({route, addAnswers, navigation}) => {
  const [inputData, setInputData] = useState([]);
  const addValues = (text, index) => {
    let dataArray = inputData;
    let checkBool = false;
    if (dataArray.length !== 0) {
      dataArray.forEach((element) => {
        if (element.index === index) {
          element.text = text;
          checkBool = true;
        }
      });
    }
    if (checkBool) {
      setInputData(dataArray);
    } else {
      dataArray.push({text: text, index: index});
      setInputData(dataArray);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text
          style={{
            textAlign: 'center',
            padding: 6,
            height: 40,
            color: BlackColor,
            backgroundColor: LightBlueColor,
            marginBottom: 18,
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          Small Questions
        </Text>
      </View>
      {route.params.test.map((t) =>
        t.questions.map((question, index) => (
          <Fragment key={index}>
            <Text style={{marginBottom: 6, fontWeight: 'bold', fontSize: 15}}>
              {question.text}?
            </Text>
            <TextInput
              placeholder="Answer"
              style={{
                padding: 10,
                borderColor: '#000000',
                borderWidth: 1,
                borderRadius: 8,
                marginBottom: 14,
              }}
              multiline={true}
              onChangeText={(text) => addValues(text, index)}
            />
          </Fragment>
        )),
      )}
      <Button
        contentStyle={{flexDirection: 'row-reverse'}}
        style={[{marginTop: 6}, {alignSelf: 'center'}]}
        mode="contained"
        color={GreenColor}
        onPress={() => addAnswers(inputData, route.params.postId, navigation)}>
        Submit Answers
      </Button>
    </View>
  );
};

Apply.propTypes = {
  addAnswers: PropTypes.func.isRequired,
};

export default connect(null, {addAnswers})(Apply);

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 8,
  },
});
