import React, {useState} from 'react';
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
        {route.params.faqs.map((faq) =>
          faq.questions.map((question, index) => (
            <>
              <Text key={index}>{question.text}</Text>
              <TextInput
                style={{
                  borderColor: '#000000',
                  borderWidth: 1,
                  borderRadius: 8,
                }}
                key={index}
                // placeholder={`Answer ${count + 1}`}
                multiline={true}
                onChangeText={(text) => addValues(text, index)}
              />
            </>
          )),
        )}
        <Button
          contentStyle={{flexDirection: 'row-reverse'}}
          style={[{marginTop: 6}, {alignSelf: 'center'}]}
          mode="contained"
          color="green"
          onPress={() =>
            addAnswers(
              inputData,
              route.params.testId,
              route.params.postId,
              navigation,
            )
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
