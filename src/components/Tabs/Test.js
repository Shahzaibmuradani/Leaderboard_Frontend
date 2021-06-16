import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-paper';
import {Card, CardItem, Body} from 'native-base';
import {
  CreateButtonColor,
  ThemeColor,
  BlackColor,
  DangerColor,
} from '../../utils/Constant';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput: [],
      inputData: [],
      checkCreate: false,
    };
  }

  //function to add TextInput dynamically
  addTextInput = (index) => {
    let textInput = this.state.textInput;
    this.setState({checkCreate: true});
    textInput.push(
      <TextInput
        key={index}
        style={styles.textInput}
        onChangeText={(text) => this.addValues(text, index)}
      />,
    );
    this.setState({textInput});
  };

  //function to remove TextInput dynamically
  removeTextInput = () => {
    let textInput = this.state.textInput;
    let inputData = this.state.inputData;
    textInput.pop();
    inputData.pop();
    this.setState({textInput, inputData});

    if (textInput.length === 0) {
      this.setState({checkCreate: false});
    }
  };

  //function to add text from TextInputs into single array
  addValues = (text, index) => {
    let dataArray = this.state.inputData;
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
      this.setState({
        inputData: dataArray,
      });
    } else {
      dataArray.push({text: text, index: index});
      this.setState({
        inputData: dataArray,
      });
    }
  };

  //function to console the output
  getValues = async () => {
    this.state.inputData.length > 0 &&
      this.props.onChange('questions', this.state.inputData);
  };

  render() {
    return this.props.tick ? (
      <></>
    ) : (
      <Card>
        <CardItem>
          <Body style={{alignItems: 'center'}}>
            <View>
              <View style={styles.row}>
                <View style={{margin: 10}}>
                  <TouchableOpacity
                    onPress={() =>
                      this.addTextInput(this.state.textInput.length)
                    }>
                    <Text
                      style={{
                        color: ThemeColor,
                        fontSize: 18,
                        fontWeight: 'bold',
                      }}>
                      Add
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{margin: 10}}>
                  <TouchableOpacity onPress={() => this.removeTextInput()}>
                    <Text
                      style={{
                        color: DangerColor,
                        fontSize: 18,
                        fontWeight: 'bold',
                      }}>
                      Remove
                    </Text>
                  </TouchableOpacity>
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
            color={CreateButtonColor}
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
    borderColor: BlackColor,
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

export default Test;
