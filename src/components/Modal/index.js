import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {SHeight, SWidth, WhiteColor} from '../../utils/Constant';
import moment from 'moment';
import {Calendar} from 'react-native-calendars';
import {useDispatch} from 'react-redux';
import {
  addParticipant,
  deleteParticipant,
  editParticipant,
} from '../../redux/actions/participant';

const AddModal = ({modalVisible, onPressOK, showButton = true, item}) => {
  const disptach = useDispatch();

  const [check, setCheck] = useState(false);

  const [formdata, setFormdata] = useState({
    _id: item && item?._id,
    participantName: item ? item?.participantName : '',
    location: item ? item?.location : '',
    selectedDate: item ? item?.selectedDate : '',
    units: item ? item?.units : '',
    type: item ? item?.type : '',
    points: item ? item?.points : '',
  });

  const {
    _id,
    participantName,
    location,
    selectedDate,
    units,
    type,
    points,
  } = formdata;

  const onChange = (name, value) =>
    setFormdata({
      ...formdata,
      [name]: value,
    });

  const onPress = () => {
    setCheck(true);
  };

  const onDateChange = (day) => {
    setFormdata({
      ...formdata,
      selectedDate: day.dateString,
    });
    setCheck(false);
  };

  const onSubmit = () => {
    if (
      participantName.trim() != '' &&
      location.trim() != '' &&
      units.trim() != '' &&
      type.trim() != '' &&
      points.trim() != ''
    )
      if (item) {
        disptach(editParticipant(formdata, _id));
      } else {
        disptach(addParticipant(formdata));
      }
    else {
      alert('All fields required');
    }
    onPressOK();
  };

  const onDelete = () => {
    disptach(deleteParticipant(_id));
    onPressOK();
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onPressOK}>
        {/*{modal} */}
        <View style={styles.centeredView}>
          {/*{modal inner} */}
          <View style={styles.modalView}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.modalText}>
                {item ? 'Edit ' : 'Add New '}Player
              </Text>
              <Text onPress={onPressOK}>X</Text>
            </View>
            <TextInput
              placeholderTextColor={'#bbbbbb'}
              placeholder={'Participant Name *'}
              style={{
                width: '100%',
                height: SHeight * 0.06,
                borderRadius: 4,
                borderColor: '#bbbbbb',
                borderWidth: 1,
                marginVertical: SHeight * 0.01,
              }}
              value={participantName}
              onChangeText={(text) => onChange('participantName', text)}
            />
            <TextInput
              placeholderTextColor={'#bbbbbb'}
              placeholder={'Location *'}
              style={{
                width: '100%',
                height: SHeight * 0.06,
                borderRadius: 4,
                borderColor: '#bbbbbb',
                borderWidth: 1,
                marginVertical: SHeight * 0.01,
              }}
              value={location}
              onChangeText={(text) => onChange('location', text)}
            />
            <TextInput
              placeholderTextColor={'#bbbbbb'}
              placeholder={'Units *'}
              style={{
                width: '100%',
                height: SHeight * 0.06,
                borderRadius: 4,
                borderColor: '#bbbbbb',
                borderWidth: 1,
                marginVertical: SHeight * 0.01,
              }}
              value={units}
              onChangeText={(text) => onChange('units', text)}
            />
            {check ? (
              <Calendar
                onDayPress={(day) => {
                  onDateChange(day);
                }}
                onDayLongPress={(day) => {
                  onDateChange(day);
                }}
              />
            ) : null}
            {!check &&
              (selectedDate ? (
                <Text
                  style={{
                    width: '100%',
                    height: SHeight * 0.06,
                    borderRadius: 4,
                    borderColor: '#bbbbbb',
                    borderWidth: 1,
                    marginVertical: SHeight * 0.01,
                    color: '#bbbbbb',
                    paddingTop: SHeight * 0.015,
                    paddingLeft: SHeight * 0.006,
                  }}
                  onPress={onPress}>
                  {/* {DOB} */}
                  {moment(selectedDate).format('DD/MM/YYYY')}
                </Text>
              ) : (
                <Text
                  style={{
                    width: '100%',
                    height: SHeight * 0.06,
                    borderRadius: 4,
                    borderColor: '#bbbbbb',
                    borderWidth: 1,
                    marginVertical: SHeight * 0.01,
                    color: '#bbbbbb',
                    paddingTop: SHeight * 0.015,
                    paddingLeft: SHeight * 0.006,
                  }}
                  onPress={onPress}>
                  Date *
                </Text>
              ))}
            <TextInput
              placeholderTextColor={'#bbbbbb'}
              placeholder={'Type *'}
              style={{
                width: '100%',
                height: SHeight * 0.06,
                borderRadius: 4,
                borderColor: '#bbbbbb',
                borderWidth: 1,
                marginVertical: SHeight * 0.01,
              }}
              value={type}
              onChangeText={(text) => onChange('type', text)}
            />
            <TextInput
              placeholderTextColor={'#bbbbbb'}
              placeholder={'Points *'}
              style={{
                width: '100%',
                height: SHeight * 0.06,
                borderRadius: 4,
                borderColor: '#bbbbbb',
                borderWidth: 1,
                marginVertical: SHeight * 0.01,
              }}
              value={points}
              onChangeText={(text) => onChange('points', text)}
            />
            <View
              style={{
                justifyContent: item && 'space-around',
                alignItems: 'center',
                flexDirection: item && 'row',
              }}>
              <TouchableOpacity
                onPress={onSubmit}
                activeOpacity={0.6}
                style={{
                  backgroundColor: '#605d9e',
                  justifyContent: 'center',
                  width: SWidth * 0.3,
                  height: SHeight * 0.05,
                  alignItems: 'center',
                  borderRadius: 6,
                }}>
                <Text style={{color: WhiteColor}}>
                  {item ? 'Edit' : 'Submit'}
                </Text>
              </TouchableOpacity>
              {item && (
                <TouchableOpacity
                  onPress={onDelete}
                  activeOpacity={0.6}
                  style={{
                    backgroundColor: '#F72F4D',
                    justifyContent: 'center',
                    width: SWidth * 0.3,
                    height: SHeight * 0.05,
                    alignItems: 'center',
                    borderRadius: 6,
                  }}>
                  <Text style={{color: WhiteColor}}>Delete</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>
      {showButton && (
        <TouchableOpacity
          onPress={onPressOK}
          activeOpacity={0.6}
          style={{
            backgroundColor: '#605d9e',
            justifyContent: 'center',
            width: SWidth * 0.3,
            height: SHeight * 0.05,
            alignItems: 'center',
            borderRadius: 6,
          }}>
          <Text style={{color: 'white'}}>Add Player</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AddModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    padding: SHeight * 0.02,
    height: SHeight * 0.6,
    width: SWidth * 0.8,
    backgroundColor: WhiteColor,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: SHeight * 0.01,
  },
});
