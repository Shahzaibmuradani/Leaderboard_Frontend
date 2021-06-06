import React, {Component, Fragment} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {Card, CardItem, Body} from 'native-base';
import {addQueries} from '../../actions/help';
import {connect} from 'react-redux';
// import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

class AddFaqs extends Component {
  constructor(props) {
    super(props);
    props.addQueries,
      (this.state = {
        formData: {},
        textInput: [],
        inputData: [],
        inputDataA: [],
        checkCreate: false,
      });
  }

  //function to add TextInput dynamically
  addTextInput = (index) => {
    let textInput = this.state.textInput;
    this.setState({checkCreate: true});
    textInput.push(
      <Fragment key={index}>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.addQuestions(text, index)}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.addAnswers(text, index)}
        />
      </Fragment>,
    );
    this.setState({textInput});
  };

  //function to remove TextInput dynamically
  removeTextInput = () => {
    let textInput = this.state.textInput;
    let inputData = this.state.inputData;
    let inputDataA = this.state.inputDataA;
    textInput.pop();
    inputData.pop();
    inputDataA.pop();
    this.setState({textInput, inputData, inputDataA});

    if (textInput.length === 0) {
      this.setState({checkCreate: false});
    }
  };

  //function to add text from TextInputs into single array
  addQuestions = (text, index) => {
    let dataArray = this.state.inputData;
    let checkBool = false;
    if (dataArray.length !== 0) {
      dataArray.forEach((element) => {
        if (element.index === index) {
          element.question = text;
          checkBool = true;
        }
      });
    }
    if (checkBool) {
      this.setState({
        inputData: dataArray,
      });
    } else {
      dataArray.push({question: text, index: index});
      this.setState({
        inputData: dataArray,
      });
    }
  };

  addAnswers = (text, index) => {
    let dataArrayA = this.state.inputDataA;
    let checkBool = false;
    if (dataArrayA.length !== 0) {
      dataArrayA.forEach((element) => {
        if (element.index === index) {
          element.answer = text;
          checkBool = true;
        }
      });
    }
    if (checkBool) {
      this.setState({
        inputDataA: dataArrayA,
      });
    } else {
      dataArrayA.push({answer: text, index: index});
      this.setState({
        inputDataA: dataArrayA,
      });
    }
  };

  //function to console the output
  getValues = async () => {
    console.log('Data', this.state.inputData);
    console.log(this.state.inputDataA);

    const all = {
      questions: this.state.inputData,
      answers: this.state.inputDataA,
    };

    // console.log(all);

    this.props.addQueries(all);
  };

  render() {
    return (
      <Card>
        <CardItem>
          <Body style={{alignItems: 'center'}}>
            <View>
              <View style={styles.row}>
                <View style={{margin: 10}}>
                  <Button
                    mode="contained"
                    color="#0C6CD5"
                    onPress={() =>
                      this.addTextInput(this.state.textInput.length)
                    }>
                    Add
                  </Button>
                </View>
                <View style={{margin: 10}}>
                  <Button
                    mode="contained"
                    color="#F72F4D"
                    onPress={() => this.removeTextInput()}>
                    Remove
                  </Button>
                </View>
              </View>
            </View>
          </Body>
        </CardItem>
        {this.state.textInput.map((value) => {
          return value;
        })}
        {this.state.checkCreate ? (
          <Button
            mode="contained"
            color="#694fad"
            style={styles.button}
            onPress={() => this.getValues()}>
            Create
          </Button>
        ) : (
          <></>
        )}
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    margin: 10,
  },
  row: {
    flexDirection: 'row',
  },
  button: {
    margin: 10,
  },
});

const mapDispatchToProps = {
  addQueries,
};

export default connect(null, mapDispatchToProps)(AddFaqs);
