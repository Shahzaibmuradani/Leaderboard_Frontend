import React, {Component, Fragment} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {Card, CardItem, Body} from 'native-base';
import {addQueries} from '../../redux/actions/help';
import {connect} from 'react-redux';
import {
  BlackColor,
  CreateButtonColor,
  DangerColor,
  ThemeColor,
  WhiteColor,
} from '../../utils/Constant';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';

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
    const all = {
      questions: this.state.inputData,
      answers: this.state.inputDataA,
    };
    this.props.addQueries(all, this.props.navigation);
  };

  render() {
    return (
      <View>
        <View>
          <Text style={styles.sectionsub}>
            Support & Help{' '}
            <MaterialCommunityIcons name="help-circle" size={20} />
          </Text>
        </View>
        <Card style={styles.cardView}>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sectionsub: {
    alignSelf: 'center',
    fontSize: 20,
    margin: 20,
    color: ThemeColor,
    fontWeight: 'bold',
  },
  cardView: {
    width: '90%',
    alignSelf: 'center',
  },
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

const mapDispatchToProps = {
  addQueries,
};

export default connect(null, mapDispatchToProps)(AddFaqs);
