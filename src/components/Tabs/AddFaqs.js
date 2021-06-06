import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {Card, CardItem, Body} from 'native-base';
// import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

class AddFaqs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textInputQ: [],
      inputDataQ: [],
      textInputA: [],
      inputDataA: [],
      checkCreate: false,
    };
  }

  //function to add TextInput dynamically
  addTextInput = (index) => {
    let textInputQ = this.state.textInputQ;
    let textInputA = this.state.textInputA;
    this.setState({checkCreate: true});
    textInputQ.push(
      <TextInput
        key={index}
        style={styles.textInputQ}
        onChangeText={(text) => this.addValues(text, index)}
      />,
    );
    this.setState({textInputQ});
    textInputA.push(
      <TextInput
        key={index}
        style={styles.textInputA}
        onChangeText={(text) => this.addValues(text, index)}
      />,
    );
    this.setState({textInputA});
  };

  //function to remove TextInput dynamically
  removeTextInput = () => {
    let textInputQ = this.state.textInputQ;
    let inputDataQ = this.state.inputDataQ;
    let textInputA = this.state.textInputA;
    let inputDataA = this.state.inputDataA;
    textInputQ.pop();
    inputDataQ.pop();
    textInputA.pop();
    inputDataA.pop();
    this.setState({textInputQ, inputDataQ, textInputA, inputDataA});

    if (textInputQ.length === 0 && textInputA.length === 0) {
      this.setState({checkCreate: false});
    }
  };

  //function to add text from TextInputs into single array
  addValues = (text, index) => {
    let dataArrayQ = this.state.inputDataQ;
    let dataArrayA = this.state.inputDataA;
    let checkBoolQ = false;
    let checkBoolA = false;
    if (dataArrayQ.length !== 0 && dataArrayA.length !== 0) {
      dataArrayQ.forEach((element) => {
        if (element.index === index) {
          element.text = text;
          checkBoolQ = true;
        }
      });
      dataArrayA.forEach((element) => {
        if (element.index === index) {
          element.text = text;
          checkBoolA = true;
        }
      });
    }
    if (checkBoolQ && checkBoolA) {
      this.setState({
        inputDataQ: dataArrayQ,
        inputDataA: dataArrayA,
      });
    } else {
      dataArrayQ.push({text: text, index: index});
      dataArrayA.push({text: text, index: index});
      this.setState({
        inputDataQ: dataArrayQ,
        inputDataA: dataArrayA,
      });
    }
  };

  //function to console the output
  getValues = async () => {
    console.log(this.state.inputDataQ, this.state.inputDataA);
    //this.props.onChange('questions', this.state.inputDataQ);
  };

  render() {
    // return this.props.tick ? (
    //   <></>
    // ) : (
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
                    this.addTextInput(this.state.textInputQ.length)
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
      {this.state.textInputQ.map((value) => {
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
    </Card>;
    //  );
  }
}

const styles = StyleSheet.create({
  textInputQ: {
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

export default AddFaqs;
