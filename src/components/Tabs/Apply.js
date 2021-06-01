import React, {Fragment, useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {Button} from 'react-native-paper';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addAnswers} from '../../actions/post';

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
    <View>
      <View>
        {/* <Text>{JSON.stringify(route.params)}</Text> */}
        {route.params.test.map((t) =>
          t.questions.map((question, index) => (
            <Fragment key={index}>
              <Text>{question.text}</Text>
              <TextInput
                style={{
                  borderColor: '#000000',
                  borderWidth: 1,
                  borderRadius: 8,
                }}
                // placeholder={`Answer ${count + 1}`}
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
          color="green"
          onPress={() =>
            addAnswers(inputData, route.params.postId, navigation)
          }>
          Submit Answers
        </Button>
      </View>
    </View>
  );
};

Apply.propTypes = {
  addAnswers: PropTypes.func.isRequired,
};

export default connect(null, {addAnswers})(Apply);

// const styles = StyleSheet.create({});
