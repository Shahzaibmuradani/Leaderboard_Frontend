import React, {useState} from 'react';
import {Text, View} from 'react-native';
// import {styles} from '../../../styles/itemStyles';
import moment from 'moment';
import {SHeight} from '../../../utils/Constant';
import AddModal from '../../../components/Modal';
import UserAvatar from 'react-native-user-avatar';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Item = ({participant, index}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const {participantName, location, units, selectedDate} = participant;

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => setModalVisible(!modalVisible)}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
          borderBottomWidth: 0.5,
          padding: SHeight * 0.01,
        }}>
        <View
          style={{
            alignItems: 'center',
            width: '10%',
            justifyContent: 'center',
          }}>
          <UserAvatar
            borderRadius={16 * 0.5}
            size={16}
            name={(index + 1).toString()}
          />
        </View>
        <View style={{alignItems: 'center', width: '20%'}}>
          <Text>{participantName}</Text>
        </View>
        <View style={{alignItems: 'center', width: '30%'}}>
          <Text>{location}</Text>
        </View>
        <View style={{alignItems: 'center', width: '30%'}}>
          <Text>{moment(selectedDate).format('DD/MM/YYYY')}</Text>
        </View>
        <View style={{alignItems: 'center', width: '10%'}}>
          <Text>{units}</Text>
        </View>
      </TouchableOpacity>
      <AddModal
        modalVisible={modalVisible}
        onPressOK={() => setModalVisible(!modalVisible)}
        showButton={false}
        item={participant}
      />
    </>
  );
};

export default Item;
